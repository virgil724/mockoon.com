---
title: Responses rules
meta:
  title: Server different responses based on rules
  description: Learn how to define multiple route responses for each route and triggered them with rules based on the entering request parameters.
order: 910
---

# Adding response rules

---

After creating [multiple responses](docs:route-responses/multiple-responses) for each route, you can create more complex scenarios and serve the responses depending on the fulfillment of rules.

## Defining rules

You can define an unlimited number of rules for each route. At each request, Mockoon will assert each response's rules and serve the response which contains the first matching rule(s). The rules are interpreted in the order they are declared: `[rule OR|AND rule] OR [rule OR|AND rule]`, the brackets symbolizing each route response.

![Rules interpretation order{355x395}](/images/docs/shared/dynamic-rules-schema.png)

To add a new rule to a response, go to the route response's **Rules tab**, click on "Add rule" and fill the fields:

![Click on add and fill the fields{987x304}](docs-img:add-route-response-rule.png)

### Reordering rules

By default, rules are interpreted in the order you added them. You can change their interpretation order by drag and dropping them:

![Drag and drop rules to reorder them{977x323}](docs-img:route-response-rule-reorder.png)

### Disabling rules

You can temporarily disable the rules and serve the default response only. To activate this option, click on the "rules" icon next to the response list:

![Disable rules{979x244}](docs-img:disable-rules.png)

> When this option is active, the default response will be always served and all the rules defined on this route will be ignored. Also, this option cannot be selected in addition to the random or sequential responses.

### Rules logical operator

Inside a route response, rules are interpreted by default with the OR logical operator. When you have more than one rule in a route response, you can easily switch the operator applied when interpreting the rules, by clicking on the `OR|AND` buttons at the left of the rules:

![Choose the rule operator OR AND{982x214}](docs-img:route-response-rules-operator.png)

Rules have four parts:

- a **target**
- a **property name or path**
- an **invert operator** toggle
- a comparison **operator**
- a **value**

### 1. Target

![Rule target{1007x204}](docs-img:route-response-rules-target.png)

In the dropdown menu you can choose between:

- the **body** value (full raw content or one of its properties if request's `Content-Type` is either `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`, `application/xml`, `application/soap+xml` or `text/xml`).
- the value of a **header**.
- the value of a **cookie**.
- the value of a **route parameter**.
- the value of a **query string field**.
- the **request number** index starting at 1.

### 2. Property name or path

![Rule property{1007x204}](docs-img:route-response-rules-property.png)

Depending on the **target**, the way to access properties may be different:

- **body**:
  - keep empty to match against the full raw body content.
  - use a path to access one of its properties. The syntax is based on the [object-path library](https://www.npmjs.com/package/object-path) like `users.0.name`. This is compatible with request's bodies of `Content-Type` `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`, `application/xml`, `application/soap+xml` or `text/xml`. Properties containing dots are supported by escaping the dots: `key.key\.with\.dot`.  
    _Please note that XML bodies are parsed using [xml-js](https://www.npmjs.com/package/xml-js) package. Refer to this [page](docs:xml-support) or the package documentation for more information on how the XML is parsed and how to fetch specific properties._  
    _Please also note that `multipart/form-data` only supports fields. Uploaded files will be ignored._
- **headers**: a header name like `Accept` or `Content-Type`.
- **cookies**: the cookie name like `Session-id`.
- **route param**: a route param name without the colon (":"), `:userId` becoming `userId`.
- **query string**: either provide a property name like `filter` or a path if the query string field is an object `filter.primary`.
- **request number**: _nothing has to be provided here for the request number_.

For body and query string, if the property is an array, Mockoon will automatically check in the array if at least one item matches the value.

### 3. Invert operator

You can invert the **comparison operator** (**!** equals, **!** regex match, etc.) by toggling on the exclamation mark button:

![Rule comparison operator{1007x204}](docs-img:route-response-rules-invert-operator.png)

### 4. Comparison operator

![Rule comparison operator{1007x204}](docs-img:route-response-rules-comparison-operator.png)

Multiple comparison operators are available in each rule:

- **equals**: asserts that the targeted property is equal to the **value**.
- **regex match**: asserts that the targeted property matches the regex **value**.
- **null**: asserts that the targeted property is null or absent (for **headers** or **cookies**).
- **empty array**: asserts that the targeted property is an empty array.

### 5. Value

![Rule value{1007x204}](docs-img:route-response-rules-value.png)

Depending on the comparison operator chosen, **equals** or **regex match**, you can either set a simple text value like "expected value" or any kind of regex. To use a regex, you must write it without the leading and trailing slashes.

Regex examples:
`primary|secondary`, `^user1-9`, `UTF-.*`.  
You can also test for empty values with the following regex: `^$|\s+`.

The **request number** supports simple entries like `1` or `2` but also regexes, allowing you to return a different response for the first 3 calls `^[1-3]$` or failing on odd request indexes `[13579]$`.
