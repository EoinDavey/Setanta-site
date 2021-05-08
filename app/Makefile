BUILD_DIR=buildfiles

.PHONY: tsc tut-all all clean 

all: tut-all tsc

clean:
	rm -rf ./${BUILD_DIR}

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

tut-all: ${TUT_BUILD_HTML_TGTS} ${TUT_BUILD_CSS_TGTS} ${TUT_BUILD_ASSETS}

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
TSC_BUILD_DIR=${BUILD_DIR}/tsc

TSC_SRC_FILES=$(shell find src/ -name '*.ts' -or -name '*.js')

tsc: ${TSC_BUILD_DIR}

${TSC_BUILD_DIR}: ${TSC_SRC_FILES}
	tsc -p tsconfig.new-build.json
	@touch $@
