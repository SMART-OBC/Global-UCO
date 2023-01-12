# -*- coding: utf-8 -*-
from odoo import api, fields, models, _


class DocumentsDocument(models.Model):
    _inherit = "documents.document"

    contract_id = fields.Many2one('xf.partner.contract',
        string='Contract',
    )

    @api.model
    def get_abc(self, args):
        print('self', self)
        print('ggggggggggggggggg', args)

