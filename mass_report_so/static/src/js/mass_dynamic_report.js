odoo.define("mass_report_so.smart_dynamic_report", function (require) {
    "use strict";

    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var QWeb = core.qweb;
    var ajax = require('web.ajax');
    var web_client = require('web.web_client');
    var _t = core._t;
    var framework = require('web.framework');
    var session = require('web.session');
    var operation_types;
    var current_company;
    var result_3;
    var SmartDynamic = AbstractAction.extend({
        contentTemplate: 'mass_smart_dynamic',
        events: {
            'change #type_selection': 'onclick_type_selection',
            'click #pdf': 'print_pdf',
//            'click #xlsx': 'print_xlsx',
        },

        init: function(parent, action) {
			this._super(parent, action);
			this.report_lines = action.report_lines;
			this.wizard_id = action.context.wizard | null;

		},

		willStart: function(){
        var self = this;
        return this._super()
        .then(function() {
            var def0 =  self._rpc({
                    model: 'accounting.mass.report',
                    method: 'get_properties'
            }).then(function(result) {
                console.log("----------------------------result", result)
                self.mass_report_data = result;
            });
        return $.when(def0);
        });
    },

        start: function() {
            var self = this;
            this.set("title", 'Dashboard');
            return this._super().then(function() {
                self.render_type_selection();
                self.$el.parent().addClass('oe_background_grey');
            });
        },

        print_pdf: function(e) {
            e.preventDefault();
			var self = this;
			var action_title = self._title;
			var type_selection = $('#type_selection').val();
			console.log('self.wizard_id', self.wizard_id)
			self._rpc({
				model: 'accounting.mass.report',
				method: 'mass_pdf_report',
				args: [
					[this.wizard_id], type_selection
				],
			}).then(function(data) {
				var action = {
					'type': 'ir.actions.report',
					'report_type': 'qweb-pdf',
					'report_name': 'mass_report_so.mass_report',
					'report_file': 'mass_report_so.mass_report',
					'data': {
						'report_data': data
					},
					'context': {
						'active_model': 'accounting.mass.report',
						'landscape': 1,
						'mass_report': true

					},
					'display_name': 'Mass Report',
				};
				return self.do_action(action);
			});

		},

//		print_xlsx: function(e) {
//            e.preventDefault();
//			var self = this;
//			var action_title = self._title;
//			var type_selection = $('#type_selection').val();
//			console.log('self.wizard_id', self.wizard_id)
//			self._rpc({
//				model: 'accounting.mass.report',
//				method: 'mass_xlsx_report',
//				args: [
//					[this.wizard_id], type_selection
//				],
//			}).then(function(data) {
//				var action = {
//					'type': 'ir.actions.report',
//					'report_type': 'qweb-pdf',
//					'report_name': 'mass_report_so.mass_report',
//					'report_file': 'mass_report_so.mass_report',
//					'data': {
//						'report_data': data
//					},
//					'context': {
//						'active_model': 'accounting.mass.report',
//						'landscape': 1,
//						'mass_report': true
//
//					},
//					'display_name': 'Mass Report',
//				};
//				return self.do_action(action);
//			});
//
//		},

		onclick_type_selection: async function(e) {
			e.preventDefault();
			var option = $('#type_selection').val();
			if (option == 'undefined'){
			    option = 'certified'
			}
			console.log('kkkkkkkk', option)
			var self = this;
			current_company = option
			await self._rpc({
				model: 'accounting.mass.report',
				method: 'get_properties',
				args: [
					option
				],
			}).then(function(result) {
			    self.mass_report_data = result;
			    $('.smart-table').remove();
			    var table = document.createElement('table');
			    table.setAttribute('class', 'smart-table form-group col-11');
			    table.setAttribute("style", "margin-top:50px; width:90%; margin-left:20px;");

			    var thead = document.createElement("thead");
			    thead.setAttribute("class", "table-row-group; background-color:#714B67;; border: 0.3rem solid #714B67;border-bottom: none;");
			    thead.setAttribute("style", "display: table-row-group; background-color:#714B67; border: 0.3rem solid #714B67;border-bottom: none;");

			    var tr_name = document.createElement('tr');
			    var th_name = document.createElement('th');
			    th_name.setAttribute("style", "color: white;");
			    th_name.setAttribute("scope", "col");
                th_name.appendChild( document.createTextNode('Name') );
                tr_name.appendChild(th_name);

                var tr_invoice = document.createElement('tr');
			    var th_invoice = document.createElement('th');
			    th_invoice.setAttribute("style", "color: white;");
			    th_invoice.setAttribute("scope", "col");
                th_invoice.appendChild( document.createTextNode('Invoice') );
                tr_name.appendChild(th_invoice);

                var tr_sales_contract = document.createElement('tr');
			    var th_sales_contract = document.createElement('th');
			    th_sales_contract.setAttribute("style", "color: white;");
			    th_sales_contract.setAttribute("scope", "col");
                th_sales_contract.appendChild( document.createTextNode('Sales Contract') );
                tr_name.appendChild(th_sales_contract);

                var tr_company = document.createElement('tr');
			    var th_company = document.createElement('th');
			    th_company.setAttribute("style", "color: white;");
			    th_company.setAttribute("scope", "col");
                th_company.appendChild( document.createTextNode('Company') );
                tr_name.appendChild(th_company);

                var tr_containers = document.createElement('tr');
			    var th_containers = document.createElement('th');
			    th_containers.setAttribute("style", "color: white;");
			    th_containers.setAttribute("scope", "col");
                th_containers.appendChild( document.createTextNode('Containers') );
                tr_name.appendChild(th_containers);

                var tr_weight_dn_out = document.createElement('tr');
			    var th_weight_dn_out = document.createElement('th');
			    th_weight_dn_out.setAttribute("style", "color: white;");
			    th_weight_dn_out.setAttribute("scope", "col");
                th_weight_dn_out.appendChild( document.createTextNode('Weight DN-Out') );
                tr_name.appendChild(th_weight_dn_out);

                var tr_purchase_contract = document.createElement('tr');
			    var th_purchase_contract = document.createElement('th');
			    th_purchase_contract.setAttribute("style", "color: white;");
			    th_purchase_contract.setAttribute("scope", "col");
                th_purchase_contract.appendChild( document.createTextNode('Purchase contract') );
                tr_name.appendChild(th_purchase_contract);

                var tr_company_other = document.createElement('tr');
			    var th_company_other = document.createElement('th');
			    th_company_other.setAttribute("style", "color: white;");
			    th_company_other.setAttribute("scope", "col");
                th_company_other.appendChild( document.createTextNode('Company') );
                tr_name.appendChild(th_company_other);

                var tr_product = document.createElement('tr');
			    var th_product = document.createElement('th');
			    th_product.setAttribute("style", "color: white;");
			    th_product.setAttribute("scope", "col");
                th_product.appendChild( document.createTextNode('Product') );
                tr_name.appendChild(th_product);

                var tr_c_o_o = document.createElement('tr');
			    var th_c_o_o = document.createElement('th');
			    th_c_o_o.setAttribute("style", "color: white;");
			    th_c_o_o.setAttribute("scope", "col");
                th_c_o_o.appendChild( document.createTextNode('C.O.O.') );
                tr_name.appendChild(th_c_o_o);

                var tr_dn_in = document.createElement('tr');
			    var th_dn_in = document.createElement('th');
			    th_dn_in.setAttribute("style", "color: white;");
			    th_dn_in.setAttribute("scope", "col");
                th_dn_in.appendChild( document.createTextNode('DN IN') );
                tr_name.appendChild(th_dn_in);

                var tr_weight_dn_in = document.createElement('tr');
			    var th_weight_dn_in = document.createElement('th');
			    th_weight_dn_in.setAttribute("style", "color: white;");
			    th_weight_dn_in.setAttribute("scope", "col");
                th_weight_dn_in.appendChild( document.createTextNode('Weight DN-In') );
                tr_name.appendChild(th_weight_dn_in);

                var tr_transaction_date = document.createElement('tr');
			    var th_transaction_date = document.createElement('th');
			    th_transaction_date.setAttribute("style", "color: white;");
			    th_transaction_date.setAttribute("scope", "col");
                th_transaction_date.appendChild( document.createTextNode('Transaction date') );
                tr_name.appendChild(th_transaction_date);

                var tr_bill = document.createElement('tr');
			    var th_bill = document.createElement('th');
			    th_bill.setAttribute("style", "color: white;");
			    th_bill.setAttribute("scope", "col");
                th_bill.appendChild( document.createTextNode('Bill') );
                tr_name.appendChild(th_bill);

                thead.appendChild(tr_name);
                thead.appendChild(tr_invoice);
                thead.appendChild(tr_sales_contract);
                thead.appendChild(tr_company);
                thead.appendChild(tr_containers);
                thead.appendChild(tr_weight_dn_out);
                thead.appendChild(tr_purchase_contract);
                thead.appendChild(tr_company_other);
                thead.appendChild(tr_product);
                thead.appendChild(tr_c_o_o);
                thead.appendChild(tr_dn_in);
                thead.appendChild(tr_weight_dn_in);
                thead.appendChild(tr_transaction_date);
                thead.appendChild(tr_bill);
                table.appendChild(thead);
                console.log("---------------------table", table)

                var tbody = document.createElement("tbody");
                for (let line of self.mass_report_data) {
                    var tr_body = document.createElement('tr');
                    var td_1_body = document.createElement('td');
                    td_1_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_1_body.appendChild( document.createTextNode(line[0]) );
                    tr_body.appendChild(td_1_body);

                    var td_2_body = document.createElement('td');
                    td_2_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_2_body.appendChild( document.createTextNode(line[1]) );
                    tr_body.appendChild(td_2_body);

                    var td_3_body = document.createElement('td');
                    td_3_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_3_body.appendChild( document.createTextNode(line[2]) );
                    tr_body.appendChild(td_3_body);

                    var td_4_body = document.createElement('td');
                    td_4_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_4_body.appendChild( document.createTextNode(line[3]) );
                    tr_body.appendChild(td_4_body);

                    var td_5_body = document.createElement('td');
                    td_5_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_5_body.appendChild( document.createTextNode(line[4]) );
                    tr_body.appendChild(td_5_body);

                    var td_6_body = document.createElement('td');
                    td_6_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_6_body.appendChild( document.createTextNode(line[5]) );
                    tr_body.appendChild(td_6_body);

                    var td_7_body = document.createElement('td');
                    td_7_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_7_body.appendChild( document.createTextNode(line[6]) );
                    tr_body.appendChild(td_7_body);

                    var td_8_body = document.createElement('td');
                    td_8_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_8_body.appendChild( document.createTextNode(line[7]) );
                    tr_body.appendChild(td_8_body);

                    var td_9_body = document.createElement('td');
                    td_9_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_9_body.appendChild( document.createTextNode(line[8]) );
                    tr_body.appendChild(td_9_body);

                    var td_10_body = document.createElement('td');
                    td_10_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_10_body.appendChild( document.createTextNode(line[9]) );
                    tr_body.appendChild(td_10_body);

                    var td_11_body = document.createElement('td');
                    td_11_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_11_body.appendChild( document.createTextNode(line[10]) );
                    tr_body.appendChild(td_11_body);

                    var td_12_body = document.createElement('td');
                    td_12_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_12_body.appendChild( document.createTextNode(line[11]) );
                    tr_body.appendChild(td_12_body);

                    var td_13_body = document.createElement('td');
                    td_13_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_13_body.appendChild( document.createTextNode(line[12]) );
                    tr_body.appendChild(td_13_body);

                    var td_14_body = document.createElement('td');
                    td_14_body.setAttribute("style", "border: 0.3rem solid black; border-right: none; border-top: none;");
                    td_14_body.appendChild( document.createTextNode(line[13]) );
                    tr_body.appendChild(td_14_body);


                    tbody.appendChild(tr_body);
                }
                table.appendChild(tbody);


			    const body = document.createElement("tbody");
			    body.classList.add( "table_body" );
			    $('.table_smart').append(table)
			});
		},

         render_type_selection:  function() {
            var self = this;

            var def1 =  this._rpc({
                model: 'accounting.mass.report',
                method: 'get_type_selection'
            }).then(function(result) {
                console.log('result', result)
                var com = result[0]
                for (var c in result[0]) {
                    if (com[c].id === result[1]){
                        console.log('good');
                        current_company = com[c].id
                        $('#type_selection').append('<option id="'+com[c].id+'" value="'+com[c].name+'" selected="">'+String(com[c].name)+'</option>')
                    } else {
                        $('#type_selection').append('<option id="'+com[c].id+'" value="'+com[c].name+'">'+String(com[c].name)+'</option>')
                    };
                };
            });
        },
    });
    core.action_registry.add('mass_report_so', SmartDynamic);
    return;
});
