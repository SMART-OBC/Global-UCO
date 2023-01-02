{
    'name': "Mass Report",
    'version': "15.0.0.0",
    'author': "SMART",
    'category': "Tools",
    'summary': "Custom report in accounting",
    'license': 'LGPL-3',
    'data': [
        'security/ir.model.access.csv',
        'views/menu_item.xml',
        'views/pdf_report.xml'
    ],
    'demo': [],
    'depends': ['account_accountant', 'xf_partner_contract'],
    'assets': {
        'web.assets_backend': [
            '/mass_report_so/static/src/js/mass_dynamic_report.js',
        ],
        'web.assets_qweb': [
            '/mass_report_so/static/src/xml/mass_dynamic_report.xml'
        ],
    },
    'installable': True,
}
