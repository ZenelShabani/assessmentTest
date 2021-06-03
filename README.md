### Assessment Test
>Assessment | Connects to github api | gets repo details and &amp; commits

### Assessment targets done
Required
- [x] Connecting to github api
- [x] Loading repositories from github
- [x] Fetching commits / repository

Bonus
- [ ] Use modern css modules
- [x] Infinite scroll commits page
- [x] Add search / sort function
- [ ] Component library
- [ ] Server side rendering

Extra
- [x] Lazy loading components
- [x] Code splitting
- [x] Global loading
- [x] Middleware
- [x] Stylus
- [x] Layouts
- [x] Internalization (with cookies)


### To run the project
```
yarn && yarn dev
```
or
```
npm i && npm run dev
```

### ES6 usages

[Commits.vue](./src/pages/repos/Commits.vue)
- Arrow function to escape scope
```
if (this.searchValue !== '' && this.searchValue) {
  allCommits = allCommits.filter(item => {
    return item.commit.message
      .toUpperCase()
      .includes(this.searchValue.toUpperCase())
  })
}
```

- Spread operator | instead of looping though object and reassigning values
```
...mapActions({
  getItems: 'commit/getItems',
}),
```

- Promise resolve callback & catch error
```
loadMore() {
    this.getItems({
    user: this.$route.params.id,
    repo: this.$route.params.repo,
    limit: this.limit,
    page: this.page
  }).then(d => {
    console.log(d)
    this.isLoading = false
  }).catch(e => console.log(e))
}
```

[api.js](./src/plugins/api.js)
- Template literals instead of using ```str + 'var'```
```
commit(`${namespace}_SET_ERROR`, e.message)
```
