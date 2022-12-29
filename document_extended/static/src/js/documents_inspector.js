odoo.define('document_extended.DocumentsExtended', function (require) {
    "use strict";
    var DocumentsInspector = require('documents.DocumentsInspector');
    const DocumentsViewMixin = require('documents.viewMixin');
    DocumentsInspector.include({
    /**
     * @private
     * @return {Promise}
     */
    _renderFields: function () {
        const options = {mode: 'edit'};
        const proms = [];
        if (this.records.length === 1) {
            proms.push(this._renderField('name', options));
            if (this.records[0].data.type === 'url') {
                proms.push(this._renderField('url', options));
            }
        }
        if (this.records.length > 0) {
            proms.push(this._renderField('partner_id', options));
            proms.push(this._renderField('owner_id', options));
            proms.push(this._renderField('folder_id', {
                icon: 'fa fa-folder o_documents_folder_color',
                mode: 'edit',
            }));
            proms.push(this._renderField('contract_id', options));
            proms.push(this._renderField('start_date', options));
            proms.push(this._renderField('expiration_date', options));
            proms.push(this._renderField('action_by_date', options));
            proms.push(this._renderField('action', options));
        }
        return Promise.all(proms);
    },
    })
    DocumentsViewMixin.inspectorFields = [
        'active',
        'activity_ids',
        'available_rule_ids',
        'checksum',
        'display_name', // necessary for the mail tracking system to work correctly
        'folder_id',
        'lock_uid',
        'message_attachment_count',
        'message_follower_ids',
        'message_ids',
        'mimetype',
        'name',
        'owner_id',
        'partner_id',
        'previous_attachment_ids',
        'res_id',
        'res_model',
        'res_model_name',
        'res_name',
        'share_ids',
        'tag_ids',
        'type',
        'url',
        'contract_id',
        'start_date',
        'expiration_date',
        'action_by_date',
        'action'
    ]
    return DocumentsViewMixin;
})