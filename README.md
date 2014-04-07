# GENI Authorization Tool #

This tool will sign credentials that allow a tool to act on behalf of
a user. Aside from direct user interaction, there are two kinds of
entities that interact with this tool: Member Authorities and Tool
frontends.

As a federation-wide utility, this tool will reside at a trusted
location accessible via SSL connection. Any tool frontend can invoke a
JavaScript function which will popup an authorization window for the
user.

## Test Environment ##

To try out GENI Authorization, you will need a GENI certificate and
key bundle in PEM format, and the ability to host the source files on
a webhost. For testing, you need not host them via SSL.

Upload all of the files in the repository to your chosen
destination. Once you have the files hosted, you can visit index.html
by itself to simply load and clear your certificate. Or you can visit
tool.html to try out the example tool and get a signed credential.

## Tool API ##

To use the GENI Authorization Tool in your tool, you will need to
include geni-auth.js into the web frontend of your tool. In your event
function that handles the user's authorization, invoke the
genilib.authorize method.

### genilib.authorize (id, cert, callback) ###

This method pops up an authorization window allowing the user to
create a speaks-for credential for your tool. This should only be
invoked in response to a user-driven event such as a click or the
browser's popup blocker may interfere.

Parameters:

- *id:* An opaque string, usually the URN of the tool
- *cert:* PEM-encoded certificate of the tool. Should be valid for any
  authority your tool needs to establish trust with.
- *callback:* This method will be invoked with a string containing the
  XML GENI credential. There is no timeout and this method may never
  be called if the user closes the authorization window.

Returns: The authorization window

## Member Authority API ##

Member Authorities may optionally present a web interface that lets
the user pass their certificate to the GENI Authorization Tool. If
they do not present a web interface, it will be up to the user to
manually paste in their certificate file.

Once the user's identity has been verified, the member authority
invokes genilib.sendCertificate to pass the certificate to the trusted
signer.

### genilib.sendCertificate (cert) ###

This method sends a user's GENI certificate to the GENI Authorization
Tool which is presumed to live in the browser window that opened the
current one. After sending the message, it will close the current
window or tab. If this function is invoked in some other circumstance,
it simply closes the current window or tab.

Parameters:

- *cert:* A pem-encoded certificate and private key belonging to the
  logged in user.

Returns: Nothing
