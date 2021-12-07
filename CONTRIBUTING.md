# How to add a new component

## Create it as a lib using nx

```bash
# This will create the components module in the libs folder

nx g lib <component>
```

## Create the component in the lib

```bash
# This will create the component and its files in
# the libs/<component>/src/lib/<component> folder

nx g c <component> --project=<component>
```

## Create a user story for the component

```bash
# This will create a user story configuration along with
# an e2e-app for that component with test files, story files and spec files

nx g storybook-configuration <component>
```

## Test the components story

```bash
# This wills start the storybook tool to test the component with a preview in the browser

nx run <component>:storybook
```

## Export the component from the ComponentsModule

```typescript
@NgModule({
    imports: [CommonModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent], // Important to add this line, so it can be rendered in mate-team
})
export class HeaderModule {}
```
