/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
/*******************************************************************
 * Sibonni | SIB0-549 | Sample User Event Script
 * *****************************************************************
 *
 * Date: 26/08/2021
 *
 * Author:Jobin and Jismi IT Services LLP
 *
 * REVISION HISTORY
 *
 * Revision
 *
 * Description: Add a button to Netsuite for Email Approval
 *
 * ****************************************************************/

define(['N/currentRecord'],
    /**
     * @param{currentRecord} currentRecord
     */
    (currentRecord) => {
        const beforeLoad = (scriptContext) => {
            /**
             * Defines the function definition that is executed before record is loaded.
             * @param {Object} scriptContext
             * @param {Record} scriptContext.newRecord - New record
             * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
             * @param {Form} scriptContext.form - Current form
             * @since 2015.2
             */

            if (scriptContext.type == 'view') {

            try {
                var newRecord = scriptContext.newRecord;
                var emailCnfrmValue = newRecord.getValue({fieldId:'custentity_email_approve_chckbox'});

            }catch (err) {
                    log.error({title: "Error in getting checkbox value", details: err.message});}

                try{

               if(emailCnfrmValue === false) {

                   // Add Button for Email Approval

                    var form = scriptContext.form;

                    var approveButton = form.addButton
                    ({
                        id: "custpage_approveButton",
                        label: "Email for Confirmation",
                        functionName: "onclick_approveEmail"
                    });

                    //specify the path to call onClick_approveEmail function in Client Script

                    form.clientScriptModulePath = "SuiteScripts/CS_onClick_approveEmail.js";
                   form.clientScriptFileId =  7769;

                }

            }catch (err) {
                log.error({title: "Error in Button Creation", details: err.message});}
            }
        }

        return {beforeLoad:beforeLoad};

    });
