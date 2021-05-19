BUILD_DIR=buildfiles
DIST_DIR=dist

.PHONY: tsc tut-all all clean webpack test

all: ${DIST_DIR}

clean:
	rm -rf ./${BUILD_DIR} ./${DIST_DIR}

test:
	npx eslint --ext .ts,.js --max-warnings=0 src/
	for lang in en ga; do \
		( \
			cd ${TUT_SRC_DIR}/$${lang}/; \
			awk -f ../scripts/test.awk *.md; \
		) || exit 1; \
	done || exit 1;


## Tutorial generation

TUT_SRC_DIR=tut
TUT_BUILD_DIR=${BUILD_DIR}/tutbuild
TUT_OUT_DIR=${BUILD_DIR}/tut

TUT_SRC_EN_MD=$(wildcard ${TUT_SRC_DIR}/en/*.md)
TUT_SRC_GA_MD=$(wildcard ${TUT_SRC_DIR}/ga/*.md)
TUT_SRC_ASSETS=$(shell find ${TUT_SRC_DIR} -name '*.gif' -or -name '*.png')

TUT_TEMPLATE_SRC_FILES=$(wildcard ${TUT_SRC_DIR}/*.html) \
	${TUT_SRC_DIR}/setanta.xml ${TUT_SRC_DIR}/style.theme \
	${TUT_SRC_DIR}/defaults.yaml

TUT_OUT_FILES=${TUT_SRC_ASSETS:${TUT_SRC_DIR}/%=${TUT_OUT_DIR}/%} \
	${TUT_SRC_EN_MD:${TUT_SRC_DIR}/%.md=${TUT_OUT_DIR}/%.html} \
	${TUT_SRC_GA_MD:${TUT_SRC_DIR}/%.md=${TUT_OUT_DIR}/%.html} \
	${TUT_OUT_DIR}/main.css

tut-all: ${TUT_OUT_FILES}

${TUT_BUILD_DIR}/en/templates/all-toc.html: ${TUT_SRC_EN_MD} tut/scripts/gen_toc.awk
	@mkdir -p $(@D)
	awk -f tut/scripts/gen_toc.awk -v START=intro.md ${TUT_SRC_EN_MD} > $@

${TUT_BUILD_DIR}/ga/templates/all-toc.html: ${TUT_SRC_GA_MD} tut/scripts/gen_toc.awk
	@mkdir -p $(@D)
	awk -f tut/scripts/gen_toc.awk -v START=reamhra.md ${TUT_SRC_GA_MD} > $@

${TUT_OUT_DIR}/%: ${TUT_SRC_DIR}/%
	@mkdir -p $(@D)
	cp $< $@

.SECONDEXPANSION:
PERCENT := %
${TUT_OUT_DIR}/en/%.html: LANG=en
${TUT_OUT_DIR}/ga/%.html: LANG=ga
${TUT_OUT_DIR}/%.html: ${TUT_SRC_DIR}/%.md \
		$$(patsubst ${TUT_OUT_DIR}/$${PERCENT}, ${TUT_BUILD_DIR}/$${PERCENT}/templates/all-toc.html, $$(@D)) \
		${TUT_TEMPLATE_SRC_FILES}
	@mkdir -p ${@D}
	awk -f tut/scripts/proc.awk $< | pandoc -s --defaults ${TUT_SRC_DIR}/defaults.yaml \
		--data-dir ${TUT_BUILD_DIR}/${LANG} -V lang=${LANG} -o $@

## Typescript Compilation

TSC_SRC_DIR=src
TSC_CONFIG=tsconfig.json
TSC_BUILD_DIR=${BUILD_DIR}/tsc
TSC=npx tsc

TSC_SRC_FILES=$(shell find src/ -name '*.ts' -or -name '*.js')

tsc: ${TSC_BUILD_DIR}

${TSC_BUILD_DIR}: ${TSC_SRC_FILES} ${TSC_CONFIG}
	${TSC} -p ${TSC_CONFIG}
	@touch $@

## Webpack Compilation

WEBPACK_BUILD_DIR=${BUILD_DIR}/webpack
WEBPACK=npx webpack --mode=production

WEBPACK_CONFIG=webpack.config.js
WEBPACK_HTML_FILES=$(wildcard src/*.html)
WEBPACK_CODE_MIRROR_CSS=$(shell find node_modules/codemirror -name '*.css')
WEBPACK_ASSETS=assets/
WEBPACK_ROOT_ASSETS=assets/favicon.ico assets/manifest.json
WEBPACK_POLYFILLS=node_modules/@webcomponents/webcomponentsjs/

webpack: ${WEBPACK_BUILD_DIR}

${WEBPACK_BUILD_DIR}: ${TSC_BUILD_DIR} ${TUT_OUT_FILES} ${WEBPACK_CONFIG} \
		${WEBPACK_HTML_FILES} ${WEBPACK_CODE_MIRROR_CSS} ${WEBPACK_ASSETS} \
		${WEBPACK_ROOT_ASSETS} ${WEBPACK_POLYFILLS}
	${WEBPACK} -c ${WEBPACK_CONFIG}
	@touch $@

## Final stage

${DIST_DIR}: ${WEBPACK_BUILD_DIR}
	rsync -r ${WEBPACK_BUILD_DIR}/ ${DIST_DIR}
	@touch $@
