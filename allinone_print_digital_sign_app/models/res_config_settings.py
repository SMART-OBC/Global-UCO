# -*- coding: utf-8 -*-

from odoo import models, fields, api


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    is_sign_inventory = fields.Boolean(String="Allow Digital Signature for Inventory")
    is_confirm_sign_inventory = fields.Boolean(string="Required Signature on Validate Inventory")
    sign_applicable_inside = fields.Selection([
        ('picking', 'Picking Operation'),
        ('delivery', 'Delivery Slip'),
        ('both', 'Both'),
    ], string="Allow Signature for")

    is_sign_invoice = fields.Boolean(String="Allow Digital Signature in Customer Invoice")
    is_sign_bill = fields.Boolean(String="Allow Digital Signature in Vendor Bill")
    is_confirm_sign_invoice = fields.Boolean(string="Required Signature on Validate Customer Invoice", default=False)
    is_confirm_sign_bill = fields.Boolean(string="Required Signature on Validate Vendor Bill", default=False)

    is_sign_purchase = fields.Boolean(String="Allow Digital Signature in Purchase")
    is_confirm_sign_purchase = fields.Boolean(string="Required Signature on Confirm Purchase Order", default=False)

    is_sign_sale = fields.Boolean(String="Allow Digital Signature for Sale")
    is_confirm_sign_sale = fields.Boolean(string="Required Signature on Confirm Sale Order")

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        res.update(
            is_sign_inventory=(self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_sign_inventory')),
            is_confirm_sign_inventory=(
                self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_confirm_sign_inventory')),
            sign_applicable_inside=(
                self.env['ir.config_parameter'].sudo().get_param('digital_signature.sign_applicable_inside')),
            is_sign_invoice=(self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_sign_invoice')),
            is_sign_bill=(self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_sign_bill')),
            is_confirm_sign_invoice=(
                self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_confirm_sign_invoice')),
            is_confirm_sign_bill=(
                self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_confirm_sign_bill')),
            is_sign_purchase=(self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_sign_purchase')),
            is_confirm_sign_purchase=(
                self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_confirm_sign_purchase')),
            is_sign_sale=(self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_sign_sale')),
            is_confirm_sign_sale=(
                self.env['ir.config_parameter'].sudo().get_param('digital_signature.is_confirm_sign_sale'))
        )
        return res

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_sign_inventory', self.is_sign_inventory),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_confirm_sign_inventory',
                                                         self.is_confirm_sign_inventory),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.sign_applicable_inside',
                                                         self.sign_applicable_inside),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_sign_invoice', self.is_sign_invoice),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_sign_bill', self.is_sign_bill),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_confirm_sign_invoice',
                                                         self.is_confirm_sign_invoice),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_confirm_sign_bill',
                                                         self.is_confirm_sign_bill),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_sign_purchase', self.is_sign_purchase),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_confirm_sign_purchase',
                                                         self.is_confirm_sign_purchase),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_sign_sale', self.is_sign_sale),
        self.env['ir.config_parameter'].sudo().set_param('digital_signature.is_confirm_sign_sale',
                                                         self.is_confirm_sign_sale),
