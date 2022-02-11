# mongodb-validator-generator

# 🔋 MongoDB Validator Generator 🔋
## _A simple script that generates a [Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/#schema-validation) for a MongoDB collection._


MongoDB provides the capability to perform schema validation during updates and insertions.

When MongoDB v5.0 had not yet been released there were no errors if an inserted document did not respect the Validation Schema; this resulted in a complexity in finding the cause of the validation failure, specially if the validator was complex and articolated.
