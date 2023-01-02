# -*- coding: utf-8 -*-


from odoo import api, models, fields, _


class SmartReport(models.AbstractModel):
    _name = 'report.mass_report_so.mass_report'
    _description = 'report mass report_so mass report'

    @api.model
    def _get_report_values(self, docids, data=None):
        if self.env.context.get('mass_report'):

            if data.get('report_data'):
                data.update({
                    'lines': data.get('report_data')['orders']
                })
            return data
