# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': "Document Extended",
    'summary': """Document Extended""",
    'description': """Document Extended""",
    'version': '1.0',
    'depends': ['base','web','documents'],
    'auto_install': True,
    'data': [
        'security/ir.model.access.csv',
        'views/documents_type.xml',
        'data/data.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'document_extended/static/src/js/documents_inspector.js',
            'document_extended/static/src/scss/document_view.scss',
        ]
        },
    'license': 'LGPL-3',
}
