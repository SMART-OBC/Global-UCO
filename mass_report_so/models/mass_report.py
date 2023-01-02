# -*- coding: utf-8 -*-
from odoo.http import request

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


class AccountingMassReport(models.Model):
    _name = 'accounting.mass.report'
    _description = 'accounting mass report'

    @api.model
    def get_type_selection(self):
        type_selection = [{'name': 'certified', 'id': 1}, {'name': 'Non Certified', 'id': 2}]
        default_type_selection = 1
        return type_selection, default_type_selection

    def _generate_row(self, line):
        """ Generates a single row in the output CSV. Will attribute the total to the box specified on the partner. """
        contract_id = line.contract_id
        invoice_ids = contract_id.invoice_ids

        container_name = ''
        container_name_list = []
        bill = ''
        bill_list = []
        co = ''
        co_list = []
        transaction_date = ''
        transaction_date_list = []
        for invoice in invoice_ids:
            if invoice.name:
                bill_list.append(invoice.name)
            if invoice.country_origin_id:
                co_list.append(invoice.country_origin_id.name)
            if invoice.invoice_date:
                us_format = "%m-%d-%Y"
                transaction_date_list.append(invoice.invoice_date.strftime(us_format))
            for inv_line in invoice.invoice_line_ids:
                if inv_line.container_no:
                    container_name_list.append(inv_line.container_no)

        if bill_list:
            bill = ','.join(bill_list)
        if transaction_date_list:
            transaction_date = ','.join(transaction_date_list)
        if container_name_list:
            container_name = ','.join(container_name_list)
        if co_list:
            co = ','.join(co_list)

        purchase_contract = ''
        company = ''
        product = line.product_id.display_name
        if contract_id.type == 'purchase':
            purchase_contract = contract_id.purchase_order_ids.mapped('name')
            company = contract_id.partner_id and line.contract_id.partner_id.display_name or ''


        row = [
            line.contract_id.ref,
            line.contract_id.ref,
            line.contract_id.name,
            line.contract_id.partner_id and line.contract_id.partner_id.display_name or '',
            container_name,
            '',                 # Weight DN-Out
            purchase_contract,  # Purchase contract
            company,            # company
            product,            # product
            co,                # coo
            '',                 # dn in
            '',                 # Weight DN-In
            transaction_date,
            bill, #bill
        ]
        return row


    @api.model
    def get_properties(self, options='certified'):
        xf_contract_ids = self.env["xf.partner.contract"].search([])

        if options == 'certified':
            line_ids = xf_contract_ids.line_ids.filtered(lambda line:line.specification_id and line.specification_id.name.lower() == 'certified')
        else:
            line_ids = xf_contract_ids.line_ids.filtered(lambda line:line.specification_id and line.specification_id.name.lower() != 'certified')

        mass_report_data = []
        for line in line_ids:
            new_row = self._generate_row(line)
            mass_report_data.append(new_row)

        return mass_report_data

    @api.model
    def mass_pdf_report(self, option, current):
        xf_contract_ids = self.env["xf.partner.contract"].search([])

        if current == 'certified':
            line_ids = xf_contract_ids.line_ids.filtered(
                lambda line: line.specification_id and line.specification_id.name.lower() == 'certified')
        else:
            line_ids = xf_contract_ids.line_ids.filtered(
                lambda line: line.specification_id and line.specification_id.name.lower() != 'certified')

        data = []
        for line in line_ids:
            new_row = self._generate_row(line)
            data.append(new_row)

        return {
            'name': "Mass Report",
            'type': 'ir.actions.client',
            'tag': 'mass_report_tag',
            'orders': data
        }
