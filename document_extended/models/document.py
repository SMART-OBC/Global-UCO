from odoo import api, models, fields, _
from datetime import datetime

class DocumentDocumentNew(models.Model):
    _inherit = "documents.document"

    contract_id = fields.Many2one("documents.type",string="Document Type")
    start_date = fields.Date("Contract Start Date")
    expiration_date = fields.Date("Contract Expiration Date")
    action_by_date = fields.Date("Action by Date")
    action = fields.Many2one("documents.action",string="Action")

    def _send_expiration_reminder(self):
        documents = self.search([]).filtered(lambda doc : doc.action_by_date is not False and doc.action is not False)
        template_id = self.env.ref("document_extended.mail_template_document_expiration_reminder").id
        template = self.env["mail.template"].sudo().browse(template_id)
        for document in documents:
            if document.action_by_date == datetime.today().date() and template:
                template.send_mail(document.id, force_send=True, notif_layout='mail.mail_notification_light')
                

class DocumentsType(models.Model):
    _name = "documents.type"

    name = fields.Char(string="Document Type",required=True)

class DocumentsAction(models.Model):
    _name = "documents.action"

    name = fields.Char(string="Name",required=True)