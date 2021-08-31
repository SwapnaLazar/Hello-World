/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
/************************************************************************
 * * Sibonni | SIB0-549 | Sample Clent Script
 ***************************************************************************
 * Date : 26/08/2021
 *
 * Author: Jobin & Jismi IT Services LLP
 *
 * Script Description : To display dialog message on clicking Email Approval Button.
 *
 *  Date created : 28/08/2021
 *
 ****************************************************************************/

define(['N/ui/dialog','N/currentRecord','N/record', 'N/http'],
/**
 * @param{dialog} dialog
 */
function(dialog,currentRecord,record,http) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
    }

    // Defining the function called in User Event Script
    function onclick_approveEmail() {

        try {

            // Pop up dialogue box for Approval

            var options = {
                title: "Email for Account Confirmation Activated!",
                message: "Click Ok to Approve"
                };

        } catch (err) {
            log.error({title: "Error setting check box field value", details: err.message});
            }

        // Function called on 'OK' dialogue response

        function success(result) {

            try {

                if (result === true)
                {

                    var curRec = currentRecord.get();
                    var recordId = curRec["id"];

                    log.debug({title: 'record', details: curRec});
                    log.debug({title: 'record ID', details: recordId});

                    // setting Email for Account Confirmation field value to true.

                    var id = record.submitFields({
                        type: record.Type.CUSTOMER,
                        id: recordId,
                        values: {
                            custentity_email_approve_chckbox: true
                              }
                     });

                    window.location.reload();
                }


             } catch (err) {
                log.error({title: "Error in dialog block", details: err.message});
                  }
          }

        function failure(reason) {
            log.debug("Failure: " + reason);
        }

        dialog.confirm(options).then(success).catch(failure);


    }
        return {
             pageInit: pageInit,
            onclick_approveEmail:onclick_approveEmail
        };
});
