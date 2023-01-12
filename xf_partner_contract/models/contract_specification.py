# -*- coding: utf-8 -*-
from odoo import api, fields, models, _


class ContractSpecification(models.Model):
    _name = "contract.specification"
    _description = "Contract Specification"

    name = fields.Char(
        string='Name',
        required=True,
    )