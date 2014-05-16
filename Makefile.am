## Process this file with automake to produce Makefile.in

#----------------------------------------------------------------------
# Handle file replacements. Files can contain configure variables, and
# will be processed by this sed script. Process files via the
# Makefile, rather than configure, so that the user can make
# adjustments to paths at Make time. This is the preferred method, see
# GNU docs for more info.
# ----------------------------------------------------------------------
edit = sed \
	-e 's|@bindir[@]|$(bindir)|g' \
	-e 's|@pkgdatadir[@]|$(pkgdatadir)|g' \
	-e 's|@pkgsysconfdir[@]|$(pkgsysconfdir)|g' \
	-e 's|@prefix[@]|$(prefix)|g'

etc/apache2.conf: Makefile
	rm -f $@ $@.tmp
	srcdir=''; \
	  test -f ./$@.in || srcdir=$(srcdir)/; \
	  $(edit) $${srcdir}$@.in >$@.tmp
	chmod a-w $@.tmp
	mv $@.tmp $@

etc/apache2.conf: $(srcdir)/etc/apache2.conf.in

# Distribute these but do not install them
EXTRA_DIST = \
	etc/apache2.conf.in

CLEANFILES = etc/apache2.conf

nobase_dist_pkgdata_DATA = \
	etc/apache2.conf

# Put all the files for the web server under 'www' for easy apache
# configuration.
wwwdatadir = $(pkgdatadir)/www

nobase_dist_wwwdata_DATA = \
	emulab.html \
	emulab.js \
	error.js \
	geni-auth.js \
	index.html \
	lib/amelia.min.css \
	lib/bootstrap/css/bootstrap-theme.css \
	lib/bootstrap/css/bootstrap-theme.css.map \
	lib/bootstrap/css/bootstrap-theme.min.css \
	lib/bootstrap/css/bootstrap.css \
	lib/bootstrap/css/bootstrap.css.map \
	lib/bootstrap/css/bootstrap.min.css \
	lib/bootstrap/fonts/glyphicons-halflings-regular.eot \
	lib/bootstrap/fonts/glyphicons-halflings-regular.svg \
	lib/bootstrap/fonts/glyphicons-halflings-regular.ttf \
	lib/bootstrap/fonts/glyphicons-halflings-regular.woff \
	lib/bootstrap/js/bootstrap.js \
	lib/bootstrap/js/bootstrap.min.js \
	lib/cyborg.min.css \
	lib/forge/aes.js \
	lib/forge/aesCipherSuites.js \
	lib/forge/asn1.js \
	lib/forge/debug.js \
	lib/forge/des.js \
	lib/forge/forge.js \
	lib/forge/form.js \
	lib/forge/hmac.js \
	lib/forge/http.js \
	lib/forge/jsbn.js \
	lib/forge/log.js \
	lib/forge/md.js \
	lib/forge/md5.js \
	lib/forge/mgf.js \
	lib/forge/mgf1.js \
	lib/forge/oids.js \
	lib/forge/pbe.js \
	lib/forge/pbkdf2.js \
	lib/forge/pem.js \
	lib/forge/pkcs1.js \
	lib/forge/pkcs12.js \
	lib/forge/pkcs7.js \
	lib/forge/pkcs7asn1.js \
	lib/forge/pki.js \
	lib/forge/prime.worker.js \
	lib/forge/prng.js \
	lib/forge/pss.js \
	lib/forge/random.js \
	lib/forge/rc2.js \
	lib/forge/rsa.js \
	lib/forge/sha1.js \
	lib/forge/sha256.js \
	lib/forge/socket.js \
	lib/forge/task.js \
	lib/forge/tls.js \
	lib/forge/tlssocket.js \
	lib/forge/util.js \
	lib/forge/x509.js \
	lib/forge/xhr.js \
	lib/jquery-1.8.2.min.js \
	lib/underscore-min.js \
	lib/xml-crypto/enveloped-signature.js \
	lib/xml-crypto/exclusive-canonicalization.js \
	lib/xml-crypto/signed-xml.js \
	lib/xml-crypto/utils.js \
	lib/xml-crypto/xpath.js \
	lib/xmldom/dom-parser.js \
	lib/xmldom/dom.js \
	lib/xmldom/sax.js \
	require-jquery.js \
	signer.css \
	template/authorize.html \
	template/credential.txt \
	template/no-key.html \
	text.js \
	tool.html \
	xml-signer.js
