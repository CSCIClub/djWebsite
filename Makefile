all: dev docs

dev:
	virtualenv venv
	@echo 'Please run "source venv/bin/activate"'

docs: all
	cd docs && make html && cd ..

test: all
	source venv/bin/activate && \
		py.test --cov=ets tests

.PHONY: clean, all, docs, test, install

clean:
	rm -rf *.out *.xml htmlcov
