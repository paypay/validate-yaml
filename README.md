# Validate YAML

> Github action to validate yaml files against a JSON schema

## Usage

Validate your YAML files against a JSON structure by providing a schema path and a list of files.

```yaml
- name: Validate YAML
  uses: brittonhayes/validate-yaml
  with:
    schemaPath: 'schema.json'
    files: |
      example/foo.yaml
```

### Example JSON Schema

```json
{
  "test": {
    "structure": {
      "myValue": "string",
      "myValue2": "string"
    }
  }
}
```

### Example Valid YAML for this schema

```yaml
---
test:
  structure:
    myValue: '1'
    myValue2: '2'
```

### More Complex Schema

- Use `?` to indicate an optional field
- Specify the preferred type with values like "string" or "number"
- Replicate deeply nested structures in JSON to represent expected YAML

```json
{
  "structure": {
    "school": {
      "description?": "string",
      "code": "number",
      "principal": {
        "name": "string"
      },
      "classRooms": [
        {
          "name": "string",
          "id": "number",
          "location?": {
            "floor": "string",
            "building": "string"
          }
        }
      ],
      "teachers": ["string"]
    }
  }
}
```
## Options ⚙️

The following input variables options can/must be configured:

|Input variable|Necessity|Description|Default|
|----|----|----|----|
|`schemaPath`|Required|string with paths to files and directories of the JSON schema file.||
|`files`|Required|Comma separated string with paths to files and directories to check for.||
|`allow_failure`|Optional|Makes the Action fail on validation errors.|`false`|

## Outputs
- `invalidations_count`: Outputs the count of validation errors.
