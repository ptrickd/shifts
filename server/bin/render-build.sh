#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
./bin/rails db:migrate
# cd /client
# npm run build-prod
# cd ..
# bundle exec rails assets:precompile
# bundle exec rails assets:clean