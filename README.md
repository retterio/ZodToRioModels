Git -> https://github.com/retterio/ZodToRioModels/tree/main

Create a Rio template project with "rio init". Inside template project we have a class called "Test". Inside "Test" create a typescript file called "types.ts". This file will keep our zod models.

Before continuing let's add needed dependencies to our project. Add dependencies below to package.json inside project root. After adding, don't forget to run "npm i".
```typescript
"devDependencies": {
    "zod-to-json-schema": "3.17.0",
    "ts-node": "10.4.0"
  },
```

 Now we are ready to create a zod model. Let's add a zod model like below to "types.ts" that we just created..
```typescript
 import { z } from 'zod'

export const person = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().optional()
})

export type Person = z.infer<typeof person>
```
We have a script to turn this zod model into Rio model. Script is right below. Create a folder called "scripts" inside "Test" class. Inside "scripts" create a typescript file called "export-models.ts". Add code below to that file.
```typescript
import { zodToJsonSchema } from 'zod-to-json-schema'
import fs from 'fs'
import path from 'path'
import { ZodType } from 'zod'
import { person } from '../types'

const modelExporter = (t: ZodType<any>, name: string) => {
  const r = zodToJsonSchema(t, { name, $refStrategy: 'none' })
  fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'models', `${name}.json`), JSON.stringify(r.definitions[name], null, 4))
}

modelExporter(person, 'Person')


```
modelExporter(zodModelName, newRioModelFileName). To run this script we will add a script into "classes/Test/package.json".
```typescript
  "scripts": {
    "export-models": "ts-node scripts/export-models.ts"
  },
```
Now we can run our script in terminal with "npm run export-models". Before that be sure that there is "models" file inside project directory.

Now you can convert zod models into Rio models! Hope this text helped you.

Thanks!
