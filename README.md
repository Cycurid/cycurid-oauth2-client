# cycurid-oauth2-client

cycurid-oauth2-client is CycurID's solution to authentication and onboarding through the power of a Reusable Digital Identity Token. Users register with CycurID to create a Reusable Encrypted Zero-Knowledge Identity Token that they present to your company's onboarding or authentication platform, letting them seamlessly and instantly connect.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install cycurid-oauth2-client.

```bash
npm install cycurid-oauth2-client
```

## Usage

### Import

IMPORT IN REACT:

```javascript
import { Barcode } from 'cycurid-oauth2-client'
```

### Supported methods

#### Barcode

This component will generate a barcode which then can be scanned using the Imme app. After a user successfully scans and approves the OAuth request a code is sent to the redirect URL in the params that can be used at a later stage to get an authToken. The cycurid-oauth2-server package provides functions for retrieving the authToken and client data requested in the scope.

### Example
```javascript

import { Barcode } from 'cycurid-oauth2-client';


const MyComponent=()=>{

const config = {
  clientID: '<YOUR_CLIENT_ID>',
  redirectURL: '<YOUR_REDIRECT_URL>',
  scopes: ['<YOUR_SCOPES_ARRAY>'],
  action: '<YOUR_ACTION>',
  entity_name: '<YOUR_ENTITY_NAME>',
  size:'<SIZE OF QR CODE>'
};


 return(<Barcode config={config} />)
 
  }
```

### config

This is your configuration object for the client. The config is passed into each of the methods with optional overrides.

- **clientID** - The ID provided to you from [CycurID Portal Website](https://portal.cycurid.com/) see [Account Creation](#account-creation) for more details.
- **redirectURL** - This is the URL that the request is initially used to initiate the OAuth process. This URL needs to match the provided URL associated with the client account. The widget response will be sent to this address.
- **scopes** - An array of what user information you want to be returned.
- **action** - This specifies the objective that you want the user to accomplish currently, we support 'login' and 'register'.
- **entity_name** - OPTIONAL_KEY, this will change the name displayed on the widget.
- **size** - OPTIONAL_KEY, defaults to 200, this detemines the size widget.


## Account Creation

_An Cycurid Account is required to use this package_

To create an account, navigate to [CycurID Portal Website](https://portal.cycurid.com/) and click Create An Account to start verifying users' identity with CycurID.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT License

Copyright (c) 2022 CycurID

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
