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

EXTRA_DIST = etc/apache2.conf.in
CLEANFILES = etc/apache2.conf

nobase_dist_pkgdata_DATA = \
	etc/apache2.conf \
	geni-auth.js \
	index.html \
	lib/xml-crypto/exclusive-canonicalization.js \
	lib/xml-crypto/xpath.js \
	lib/xml-crypto/utils.js \
	lib/xml-crypto/enveloped-signature.js \
	lib/xml-crypto/signed-xml.js \
	lib/bootstrap/img/glyphicons-halflings-white.png \
	lib/bootstrap/img/glyphicons-halflings.png \
	lib/bootstrap/js/bootstrap.min.js \
	lib/bootstrap/js/bootstrap.js \
	lib/bootstrap/css/bootstrap-responsive.min.css \
	lib/bootstrap/css/bootstrap.min.css \
	lib/bootstrap/css/bootstrap.css \
	lib/bootstrap/css/bootstrap-responsive.css \
	lib/xmldom/dom.js \
	lib/xmldom/dom-parser.js \
	lib/xmldom/sax.js \
	lib/jquery-1.8.2.min.js \
	lib/underscore-min.js \
	lib/amelia.min.css \
	lib/aes.js \
	lib/cyborg.min.css \
	lib/jsrsasign/pkcs5pkey-1.0.js \
	lib/jsrsasign/md5.js \
	lib/jsrsasign/ripemd160.js \
	lib/jsrsasign/ChangeLog.txt \
	lib/jsrsasign/rsapem-1.1.js \
	lib/jsrsasign/jsrsasign-2.0.0.tgz \
	lib/jsrsasign/x509-1.1.js \
	lib/jsrsasign/rsapem-1.1.min.js \
	lib/jsrsasign/api/symbols/X509.html \
	lib/jsrsasign/api/symbols/RSAKey.html \
	lib/jsrsasign/api/symbols/PKCS5PKEY.html \
	lib/jsrsasign/api/symbols/ASN1HEX.html \
	lib/jsrsasign/api/symbols/global__.html \
	lib/jsrsasign/api/symbols/src/pkcs5pkey-1.0.js.html \
	lib/jsrsasign/api/symbols/src/x509-1.1.js.html \
	lib/jsrsasign/api/symbols/src/rsapem-1.1.js.html \
	lib/jsrsasign/api/symbols/src/rsasign-1.2.js.html \
	lib/jsrsasign/api/symbols/src/asn1hex-1.1.js.html \
	lib/jsrsasign/api/files.html \
	lib/jsrsasign/api/index.html \
	lib/jsrsasign/sha512.js \
	lib/jsrsasign/prng4.js \
	lib/jsrsasign/rsa.js \
	lib/jsrsasign/sha1.js \
	lib/jsrsasign/x509-1.1.min.js \
	lib/jsrsasign/sample-rsasign.html \
	lib/jsrsasign/rsasign-1.2.js \
	lib/jsrsasign/index.html \
	lib/jsrsasign/pkcs5pkey-1.0.min.js \
	lib/jsrsasign/sha256.js \
	lib/jsrsasign/rng.js \
	lib/jsrsasign/asn1hex-1.1.min.js \
	lib/jsrsasign/base64.js \
	lib/jsrsasign/sample-rsasign.png \
	lib/jsrsasign/rsasign-1.2.min.js \
	lib/jsrsasign/jsbn.js \
	lib/jsrsasign/asn1hex-1.1.js \
	lib/jsrsasign/rsa2.js \
	lib/jsrsasign/jsbn2.js \
	lib/tripledes.js

# Distribute these but do not install them
#	lib/jsrsasign/LICENSE.txt
#	lib/jsrsasign/THIRDPARTY_LICENSE.txt
