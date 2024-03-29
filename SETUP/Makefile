.PHONY: help login init set-cors destroy gen-key
.DEFAULT_GOAL := help

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

login: ## Run GCloud and Pulumi logins
	pulumi logout
	pulumi login
	gcloud auth login
	gcloud auth application-default login

init: ## Create google project and pulumi stack
	gcloud projects create cdp-boston-c384047b --set-as-default
	pulumi stack init cdp-boston-c384047b

set-cors: ## Set cors for the bucket
	gsutil cors set cors.json gs://cdp-boston-c384047b.appspot.com/

destroy: ## Fully teardown Pulumi and GCloud
	pulumi stack rm cdp-boston-c384047b --force
	gcloud projects delete cdp-boston-c384047b
	rm -f .keys/cdp-boston-c384047b.json

gen-key: ## Generate a service account JSON
	mkdir .keys/ -p
	gcloud iam service-accounts create cdp-boston-c384047b \
    	--description="CDP Dev Service Account for $(USER)" \
    	--display-name="cdp-boston-c384047b"
	gcloud projects add-iam-policy-binding cdp-boston-c384047b \
    	--member="serviceAccount:cdp-boston-c384047b@cdp-boston-c384047b.iam.gserviceaccount.com" \
		--role="roles/owner"
	gcloud iam service-accounts keys create .keys/cdp-boston-c384047b.json \
  		--iam-account "cdp-boston-c384047b@cdp-boston-c384047b.iam.gserviceaccount.com"