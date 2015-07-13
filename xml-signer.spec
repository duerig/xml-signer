Name:           xml-signer
Version:        1.3
Release:        1%{?dist}
Summary:        Credential signer for GENI
BuildArch:      noarch
License:        GENI Public License
URL:            https://github.com/duerig/xml-signer
Source0:        https://github.com/tcmitchell/xml-signer/xml-signer-1.2.tar.gz
Group:          Applications/Internet

# BuildRequires: gettext
# Requires(post): info
# Requires(preun): info

%description
Produce a signed XML documents inside the web browser.  With a
certificate and private key loaded into the browser storage or
uploaded by the user an XML document can be signed and returned to
the original calling web page.

%prep
%setup -q
#iconv -f iso8859-1 -t utf-8 -o ChangeLog.conv ChangeLog && mv -f ChangeLog.conv ChangeLog
#iconv -f iso8859-1 -t utf-8 -o THANKS.conv THANKS && mv -f THANKS.conv THANKS

%build
%configure
make %{?_smp_mflags}


%install
rm -rf $RPM_BUILD_ROOT
%make_install
# Include the copyright file
install -m 0644 debian/copyright $RPM_BUILD_ROOT/%{_defaultdocdir}/%{name}/copyright

%clean
rm -rf $RPM_BUILD_ROOT

%files
%attr(-, root, root) %doc AUTHORS INSTALL.centos README.md debian/copyright
%attr(-, root, root) %{_defaultdocdir}/%{name}/AUTHORS
%attr(-, root, root) %{_defaultdocdir}/%{name}/INSTALL.centos
%attr(-, root, root) %{_defaultdocdir}/%{name}/README.md
%attr(-, root, root) %{_defaultdocdir}/%{name}/copyright
%attr(-, root, root) %{_datadir}/%{name}/etc/apache2.conf
%attr(-, root, root) %{_datadir}/%{name}/www/emulab.html
%attr(-, root, root) %{_datadir}/%{name}/www/emulab.js
%attr(-, root, root) %{_datadir}/%{name}/www/error.js
%attr(-, root, root) %{_datadir}/%{name}/www/geni-auth.js
%attr(-, root, root) %{_datadir}/%{name}/www/index.html
%attr(-, root, root) %{_datadir}/%{name}/www/index.php
%attr(-, root, root) %{_datadir}/%{name}/www/lib/amelia.min.css
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/css/bootstrap-theme.css
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/css/bootstrap-theme.css.map
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/css/bootstrap-theme.min.css
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/css/bootstrap.css
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/css/bootstrap.css.map
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/css/bootstrap.min.css
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/fonts/glyphicons-halflings-regular.eot
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/fonts/glyphicons-halflings-regular.svg
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/fonts/glyphicons-halflings-regular.woff
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/js/bootstrap.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/bootstrap/js/bootstrap.min.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/cyborg.min.css
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/aes.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/aesCipherSuites.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/asn1.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/debug.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/des.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/forge.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/form.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/hmac.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/http.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/jsbn.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/log.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/md.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/md5.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/mgf.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/mgf1.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/oids.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pbe.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pbkdf2.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pem.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pkcs1.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pkcs12.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pkcs7.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pkcs7asn1.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pki.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/prime.worker.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/prng.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/pss.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/random.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/rc2.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/rsa.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/sha1.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/sha256.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/socket.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/task.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/tls.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/tlssocket.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/util.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/x509.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/forge/xhr.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/jquery-1.8.2.min.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/underscore-min.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/xml-crypto/enveloped-signature.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/xml-crypto/exclusive-canonicalization.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/xml-crypto/signed-xml.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/xml-crypto/utils.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/xml-crypto/xpath.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/xmldom/dom-parser.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/xmldom/dom.js
%attr(-, root, root) %{_datadir}/%{name}/www/lib/xmldom/sax.js
%attr(-, root, root) %{_datadir}/%{name}/www/require-jquery.js
%attr(-, root, root) %{_datadir}/%{name}/www/signer.css
%attr(-, root, root) %{_datadir}/%{name}/www/template/authorize.html
%attr(-, root, root) %{_datadir}/%{name}/www/template/credential.txt
%attr(-, root, root) %{_datadir}/%{name}/www/template/no-key.html
%attr(-, root, root) %{_datadir}/%{name}/www/text.js
%attr(-, root, root) %{_datadir}/%{name}/www/tool.html
%attr(-, root, root) %{_datadir}/%{name}/www/xml-signer.js

%changelog
* Mon Jul 13 2015 Tom Mitchell <tmitchell@bbn.com> - 1.3-1%{?dist}
- Add a clear cookies option during MA selection.
- Add a checkbox to remember authorize decision. Fix formatting.
- Make the GENI portal stand alone as the prominent account source.
  Emulab.net is demoted to dropdown.
* Fri Apr 17 2015 Tom Mitchell <tmitchell@bbn.com> - 1.2-1%{?dist}
- Support PKCS#8 private keys
* Tue Mar 31 2015 Tom Mitchell <tmitchell@bbn.com> - 1.1-1%{?dist}
- Styling changes
* Thu Sep 25 2014 Tom Mitchell <tmitchell@bbn.com> - 1.0.1-1%{?dist}
- RPM packaging
* Fri Sep 19 2014 Tom Mitchell <tmitchell@bbn.com> - 1.0-1%{?dist}
- Add new optional authentication protocol
- Add advanced mode to simplify UI
- UI Cleanups
