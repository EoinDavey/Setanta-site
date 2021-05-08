BUILD_DIR=buildfiles
DIST_DIR=dist

.PHONY: tsc tut-all all clean webpack

all: tut-all tsc

clean:
	rm -rf ./${BUILD_DIR} ./${DIST_DIR}

## Tutorial generation

TUT_SRC_DIR=tut
TUT_BUILD_DIR=${BUILD_DIR}/tut
TUT_SRC_ASSETS_DIR=${TUT_SRC_DIR}/assets
TUT_BUILD_ASSETS_DIR=${TUT_BUILD_DIR}/assets

TUT_SRC_MD_FILES=$(wildcard ${TUT_SRC_DIR}/*.md)
TUT_SRC_CSS_FILES=$(wildcard ${TUT_SRC_DIR}/*.css)
TUT_SRC_ASSETS=$(wildcard ${TUT_SRC_ASSETS_DIR}/*)

TUT_BUILD_HTML_TGTS=${TUT_SRC_MD_FILES:${TUT_SRC_DIR}/%.md=${TUT_BUILD_DIR}/%.html} ${TUT_BUILD_DIR}/all-toc.html
TUT_BUILD_CSS_TGTS=${TUT_SRC_CSS_FILES:${TUT_SRC_DIR}/%=${TUT_BUILD_DIR}/%}
TUT_BUILD_ASSETS=${TUT_SRC_ASSETS:${TUT_SRC_DIR}/%=${TUT_BUILD_DIR}/%}
TUT_BUILD_ALL=${TUT_BUILD_HTML_TGTS} ${TUT_BUILD_CSS_TGTS} ${TUT_BUILD_ASSETS}

tut-all: ${TUT_BUILD_ALL}

${TUT_BUILD_DIR}/all-toc.html: ${TUT_SRC_MD_FILES}
	@mkdir -p ${@D}
	awk -f tut/scripts/gen_toc.awk -v START=intro.md $^ > $@

${TUT_BUILD_DIR}/%.html: ${TUT_SRC_DIR}/%.md ${TUT_BUILD_DIR}/all-toc.html
	@mkdir -p ${@D}
	awk -f tut/scripts/proc.awk $^ | pandoc -s --defaults ${TUT_SRC_DIR}/defaults.yaml -o $@

${TUT_BUILD_DIR}/%: ${TUT_SRC_DIR}/%
	@mkdir -p ${@D}
	cp $^ $@

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
WEBPACK_CONFIG=webpack.config.js
WEBPACK=npx webpack

webpack: ${WEBPACK_BUILD_DIR}

${WEBPACK_BUILD_DIR}: ${TSC_BUILD_DIR} ${TUT_BUILD_ALL} ${WEBPACK_CONFIG}
	${WEBPACK} -c ${WEBPACK_CONFIG}
	@touch $@

## Final stage

${DIST_DIR}: ${WEBPACK_BUILD_DIR}
	rsync -rvh ${WEBPACK_BUILD_DIR}/ ${DIST_DIR}
	@touch $@
