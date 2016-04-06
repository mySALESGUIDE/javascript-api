---
title: mySALESGUIDE Javascript API Reference

language_tabs:
  - javascript

toc_footers:
  - <a href='https://github.com/mySALESGUIDE/javascript-api/releases'>Download latest JS API release</a>


search: true
---

# Introduction

The mySALESGUIDE Javascript API is accessible through a global variable (on the `window` object) called `mySALESGUIDE`.

# Working with app content

## Open a specific file

```javascript
/* To open a file with the ID 1000 */

mySALESGUIDE.openFile(1000);

/* To open a file with the filename 'dummy.txt' */

mySALESGUIDE.openFile('dummy.txt');
```

This method opens a specific file in the native file viewer.
If the file type is not supported, an error message will be shown to the app user.

### Parameters
Required | Type | Description
--------- | -----------
**Yes** | Number or String | The file identifier. This can either be a file ID or an explicit file name.


## Open a presentation / content

```javascript
/* To open a presentation with the content id 1000 using it's name as the window title */

mySALESGUIDE.openContent(1000);

/*
 * To open a content with the filename 'Calculator.zip'
 * using 'The calculator' as the window title
 */

mySALESGUIDE.openContent('Calculator.zip', 'The calculator');
```

This method opens a specific presentation in the app.

### Parameters
Required | Type | Description
--------- | -----------
**Yes** | Number or String | The content identifier. This can either be a content ID or an explicit file name.
**No** | String | The title to use when opening the content. If no title is specified, the content name will be used.


## Compose an email

```javascript
mySALESGUIDE.sendMail(
  'mail@example.com' ,
  'cc@example.com',
  'Welcome to mySALESGUIDE',
  'This is the email body',
  [1,2,3]
);
```

This method opens the compose email view and pre-fills the given values.

### Parameters
Required | Type | Description
--------- | -----------
**Yes** | String | The receivers email address
**Yes** | String | The email address to use as a carbon copy (CC)
**Yes** | String | The subject of the email
**Yes** | String | The body of the email
**No** | Array | An array containing file IDs to use as email attachments


# Working with contacts

## Open a contact picker

```javascript
function contactSelected(contact) {
  alert("You selected " + contact.first_name);
}

mySALESGUIDE.showContactPicker( 'contactSelected' );
```

> When a user selects a contact, the following javascript object will be passed to the callback function:

```json
{
  "contact_id": 1,
  "status_id": 1,
  "user_id": 1,
  "contact_source_id": 1,
  "industry_id": 1,
  "customer_group_id": 1,
  "salutation": "Frau",
  "title": "Professor",
  "first_name": "Laszlo",
  "last_name": "Ditschlerin",
  "position": "Abteilungsleitung",
  "section": "ORT interactive",
  "birthdate": null,
  "additional_information": "",
  "phone_work": "02151376314",
  "phone_fax": "02151376314",
  "phone_mobile": "02151376314",
  "phone_other": "02151376314",
  "phone_home": "02151376314",
  "email": "aputz@ullrich.net",
  "company": "ORT Interactive GmbH",
  "street": "Bachstr.",
  "zip": "41352",
  "city": "Korschenbroich",
  "state": "Baden-Württemberg",
  "country": "Germany",
  "website": "",
  "customer_number": "",
  "facebook": "",
  "twitter": "",
  "google_plus": "",
  "xing": "",
  "linked_in": "",
  "custom_field_1": null,
  "custom_field_2": null,
  "custom_field_3": null,
  "custom_field_4": null,
  "custom_field_5": null,
  "custom_field_6": null,
  "custom_field_7": null,
  "custom_field_8": null,
  "custom_field_9": null,
  "custom_field_10": null,
  "custom_field_11": null,
  "custom_field_12": null,
  "custom_field_13": null,
  "custom_field_14": null,
  "custom_field_15": null,
  "datetime_created": "2015-12-02T12:59:42+0100",
  "datetime_modified": "2015-12-07T09:58:08+0100"
}
```

This method presents a modal contact picker. When the user selects a contact from the list, the given callback method will be called.

<aside class="notice">Because of technical restrictions it is **not** possible to pass in an anonymous callback function. Use a function name, accessible on the global scope, instead.</aside>

### Parameters
Required | Type | Description
--------- | -----------
**Yes** | String | Name of the callback function.



## Save a file to a contact

```javascript
mySALESGUIDE.saveContactFile(
  'http://www.foo.bar/file.baz',
  1,
  'My Filename',
  'pdf',
  'fileSaved'
);
```

This method downloads a file and saves it to a given contact.

<aside class="notice">Because of technical restrictions it is **not** possible to pass in an anonymous callback function. Use a function name, accessible on the global scope, instead.</aside>

### Parameters
Required | Type | Description
--------- | -----------
**Yes** | String | The file URL to access the file and download it
**Yes** | Number | The contact ID to save the file to
**Yes** | String | The filename for the new file
**Yes** | String | The file extension to use
**No** | String | The name of the callback function after the file was saved
**No** | Boolean | Should the downloaded file be opened after successfully attaching it to the contact (default: true)
