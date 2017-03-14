/**
 * This class represents the API to interact with the native Salesmaster
 * app from within presentations.
 *
 * A global object named "salesmaster" will be exposed to the global scope.
 *
 * To enable AGNITIO compatibility include the salesmaster_agnitio.js file inside your agnitio presentation
 *
 * @class mySALESGUIDE
 * @version 1.1.2
 */
(function () {
    "use strict";

    window.mySALESGUIDE = window.mySALESGUIDE || {};

    /**
     * Open File API Name
     * @property OPEN_FILE_API
     * @type string
     * @private
     * @readonly
     */
    var OPEN_FILE_API = "openFile";

    /**
     * Open Content API Name
     * @property OPEN_CONTENT_API
     * @type string
     * @private
     * @readonly
     */
    var OPEN_CONTENT_API = "openContent";

    /**
     * Open ContentManager API Name
     * @property OPEN_CONTENTMANAGER_API
     * @type string
     * @private
     * @readonly
     */
    var OPEN_CONTENTMANAGER_API = "openContentManager";

    /**
     * Open File via URL API Name
     * @property OPEN_FILEURL_API
     * @type string
     * @private
     * @readonly
     */
    var OPEN_FILEURL_API = "openFileURL";

    /**
     * Open Filemanager API Name
     * @property OPEN_FILEMANAGER_API
     * @type string
     * @private
     * @readonly
     */
    var OPEN_FILEMANAGER_API = "openFileManager";

    /**
     * Send Mail API Name
     * @property SEND_MAIL_API
     * @type string
     * @private
     * @readonly
     */
    var SEND_MAIL_API = "sendMail";

    /**
     * Set presentation material API Name
     * @property PRESENTATION_MATERIAL_API
     * @type string
     * @private
     * @readonly
     */
    var PRESENTATION_MATERIAL_API = "setPresentationMaterial";

    /**
     * Set show signature API name
     * @property SHOW_SIGNATURE_API
     * @type string
     * @private
     * @readonly
     */
    var SHOW_SIGNATURE_API = "showSignature";

    /**
     * Save answered dynamic content data
     *
     * @property SAVE_DYNAMIC_CONTENT_API
     * @type string
     * @private
     * @readonly
     */
    var SAVE_DYNAMIC_CONTENT_API = "saveDynamicContent";

    /**
     * Save answered dynamic content data as PDF
     *
     * @property SAVE_DYNAMIC_CONTENT_PDF_API
     * @type string
     * @private
     * @readonly
     */
    var SAVE_DYNAMIC_CONTENT_PDF_API = "saveDynamicContentPDF";

    /**
     * Show the Contact picker modal
     *
     * @property SHOW_CONTACT_PICKER_API
     * @type string
     * @private
     * @readonly
     */
    var SHOW_CONTACT_PICKER_API = "showContactPicker";

    /**
     * Save a file and associate it with a Contact
     *
     * @property SAVE_CONTACT_FILE_API
     * @type string
     * @private
     * @readonly
     */
    var SAVE_CONTACT_FILE_API = "saveContactFile";

    /**
     * This is a private method which invokes the native API call
     *
     * @method _invoke
     * @private
     * @param {String} api        The API to call
     * @param {String} params    The parameter string - this needs to be a JSON object
     */
    function _invoke(api, params) {
        var invokestring, iFrame;

        invokestring = "salesmaster://salesmaster/" + api + "?params=" + encodeURIComponent(params);
        iFrame = document.createElement("IFRAME");
        iFrame.setAttribute("src", invokestring);
        document.body.appendChild(iFrame);
        setTimeout(function(){
            iFrame.parentNode.removeChild(iFrame);
        },100);
        iFrame = null;
    }

    /**
     * This method checks if the javascript API is loaded within a valid app context.
     *
     * @return {Boolean}
     */
    mySALESGUIDE.isAvailable = function () {
        return (navigator.userAgent.match(/mySALESGUIDE_App/g) !== null);
    };

    /**
     * This method opens a specific file in the native viewer
     *
     * @method openFile
     * @param {string|number} file File identifier. This can be a file id or the filename
     *
     * Example usage:
     *
     *        mySALESGUIDE.openFile( "Pricelist_2014.zip" );
     */
    mySALESGUIDE.openFile = function (file) {
        var params = {
            file: file
        };
        _invoke(OPEN_FILE_API, JSON.stringify(params));
    };

    /**
     * This method opens a specific file in the native viewer
     *
     * @method openContent
     * @param {string|number} content Content identifier. This can be a content id or the filename
     * @param {String} title Title to use when opening the content
     *
     * Example usage:
     *
     *        mySALESGUIDE.openContent( "Calculator.zip" );
     */
    mySALESGUIDE.openContent = function (content, title) {
        var params = {
            content: content,
            title: title
        };
        _invoke(OPEN_CONTENT_API, JSON.stringify(params));
    };

    /**
     * This method opens the compose email view
     *
     * @method sendMail
     * @param {String} to Receiver address
     * @param {String} cc CC address
     * @param {String} subject E-Mail subject
     * @param {String} body E-Mail body
     * @param {Array} files (optional) Array with file_ids or filenames to attach
     *
     * Example usage:
     *
     *        mySALESGUIDE.sendMail( 'mail@example.com' , '', 'Welcome to Salesmaster', 'This is the email body', [1,2,3] );
     *
     *        mySALESGUIDE.sendMail( 'mail@example.com' , 'cc@example.com', 'Welcome to Salesmaster', 'This is the email body', ['Pricelist.pdf','Imagemovie.mp4'] );
     */
    mySALESGUIDE.sendMail = function (to, cc, subject, body, files) {
        var _files = files || '',
            params;

        params = {
            'to': to,
            'cc': cc,
            'subject': subject,
            'body': body,
            'files': _files
        };
        _invoke(SEND_MAIL_API, JSON.stringify(params));
    };


    /**
     * This method downloads and opens the given file URL.
     *
     * @method openFileURL
     * @param {String} file_url The file URL to download and open
     * @param {String} title The file title
     *
     * Example usage
     *
     *      mySALESGUIDE.openFileURL('http://www.my-salesguide.com/foo.pdf', 'Dummy PDF file');
     */
    mySALESGUIDE.openFileURL = function (file_url, title) {
        _invoke(OPEN_FILEURL_API, JSON.stringify({
            file_url: file_url,
            title: title
        }));
    };


    /**
     * This method opens the filemanager
     *
     * @method openFilemanager
     * @param {String} folder_id (optional) The root folder to open
     *
     * Example usage
     *
     *      mySALESGUIDE.openFilemanager();
     */
    mySALESGUIDE.openFilemanager = function (folder_id) {
        _invoke(OPEN_FILEMANAGER_API, JSON.stringify({folder_id: folder_id}));
    };

    /**
     * This method saves the dynamic content data to POST to the server
     *
     * @method saveDynamicContent
     * @param {Object} postData The post data containing question and answers
     * @param {String} callback (optional) Name of the callback function to execute
     *
     * Example usage:
     *
     *        mySALESGUIDE.saveDynamicContent( getPostData(), 'generatePDF' );
     */
    mySALESGUIDE.saveDynamicContent = function (postData, callback) {
        _invoke(SAVE_DYNAMIC_CONTENT_API, JSON.stringify({postData: postData, callback: callback}));
    };

    /**
     * This method saves the dynamic content data to POST to the server
     *
     * @method saveDynamicContentPDF
     * @param {Object} pdfData The pdf base64 data to save
     * @param {Object} postData The post data to save
     * @param {Number} contactID The contact to save the file to
     * @param {String} filename
     *
     * Example usage:
     *
     *        mySALESGUIDE.saveDynamicContentPDF( pdfData, {},  1 , 'Bedarfsanalyse Auswertung');
     */
    mySALESGUIDE.saveDynamicContentPDF = function (pdfData, postData, contactID, filename) {
        _invoke(SAVE_DYNAMIC_CONTENT_PDF_API, JSON.stringify({
            pdfData: pdfData,
            postData: postData,
            contactID: contactID,
            filename: filename
        }));
    };


    /**
     * This method saves the dynamic content data to POST to the server
     *
     * @method saveDynamicContent
     * @param {String} callback The callback function to invoke, after the Contact got selected
     *
     * Example usage:
     *
     *        mySALESGUIDE.showContactPicker( 'fillForm' );
     */
    mySALESGUIDE.showContactPicker = function (callback) {
        var params = {'callback': callback};
        _invoke(SHOW_CONTACT_PICKER_API, JSON.stringify(params));
    };

    /**
     * This method saves the dynamic content data to POST to the server
     *
     * @method saveContactFile
     * @param {Object} fileURL the URL to download and save
     * @param {Number} contactID The contact to save the file to
     * @param {String} filename The filename for the new file
     * @param {String} fileExtension The file extension to use
     * @param {String} callback The name of the callback function after the file was saved
     * @param {Boolean|undefined} openFile Should the downloaded file be opened after successful transfer (default: true)
     * @param {Boolean} editPDF Should the file be editable after it is downloaded from the device?  (default: false)
     * @param {String} errorCallback The name of the callback function when an error occurs
     *
     * Example usage:
     *
     *        mySALESGUIDE.saveContactFile( pdfData, 1, 'Bedarfsanalyse Auswertung', 'pdf', 'saved');
     */
    mySALESGUIDE.saveContactFile = function (fileURL, contactID, filename, fileExtension, callback, openFile, editPDF, errorCallback) {
        if (openFile === undefined) {
            openFile = true;
        }

        _invoke(SAVE_CONTACT_FILE_API, JSON.stringify({
            'fileURL': fileURL,
            'contactID': contactID,
            'filename': filename,
            'fileExtension': fileExtension,
            'callback': callback,
            'openFile': openFile,
            'editPDF': editPDF,
            'errorCallback': errorCallback
        }));
    };

    /**
     * This method opens the filemanager
     *
     * @method openContentmanager
     * @param {String} folder_id (optional) The root folder to open
     *
     * Example usage
     *
     *      mySALESGUIDE.openContentmanager( 120 );
     */
    mySALESGUIDE.openContentmanager = function (folder_id) {
        _invoke(OPEN_CONTENTMANAGER_API, JSON.stringify({folder_id: folder_id}));
    };

    /**
     * Opens the signature view in the current presentation
     *
     * @param {String} callback (optional) Name of the callback function to execute
     *                 The callback function will receive a json string representing an object with the following data
     *                      format
     *                      data
     *                 To set an image with the signature use: myImage.src = callbackObj.format + "," + callbackObj.data;
     *
     * Example usage:
     *
     *        mySALESGUIDE.showSignature( "receivedSignature" );
     */
    mySALESGUIDE.showSignature = function (callback, returnType) {
        var params = {'callback': callback, 'returnType': returnType};
        _invoke(SHOW_SIGNATURE_API, JSON.stringify(params));
    };

    /**
     * This method sets multiple files as "presentation material" and shows them in the
     * ActionBar (Android) or NavBar (iOS)
     *
     * @method setPresentationMaterial
     * @param {Array} items Array containing the files to display.
     * This can either be an array of integer values or objects
     *
     * Example usage:
     *
     *        // Using File-IDs
     *        mySALESGUIDE.setPresentationaterial( [ 1, 2, 3 ] );
     *
     *        // Using Objects with custom titles
     *        mySALESGUIDE.setPresentationMaterial([
     *            {
     *              title: "My custom title",
     *              file_id: 1
     *            },
     *            {
     *              title: "Another custom title",
     *              file_id: 2
     *            }
     *        ]);
     */
    mySALESGUIDE.setPresentationMaterial = function (items) {
        var _items = items || [];
        var params = {"items": _items};
        _invoke(PRESENTATION_MATERIAL_API, JSON.stringify(params));
    };

    // Backwards compatibility
    window.salesmaster = window.mySALESGUIDE || {};

}());
