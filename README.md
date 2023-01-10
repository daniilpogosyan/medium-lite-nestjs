# TODO:
<!-- * Add prefix api, using separate module -->
<!-- * Add *.dto.ts -->
<!-- * Add pipes for validation query and body  -->
* Handle excepctions with nest built-ins
* ? Rewrite paths to services nicely using @
<!-- * ? Share PrismaService as global? service with posts/users/accountService -->
<!-- * Don't check if the email is in use when creating user, use try..catch instead -->
* rewrtie router
* ! Fix isBoolean in *.dto.ts (include*, exclude*). Problem: include*=false is parsed as true. Possible workaround: @Transform()
* is positive in getPost(ID)

# Questions:
<!-- * Do I need to preserve migrations from older project? -->
* ? Why they use readonly and private in ctor?
* ? Why ts transpiles `readonly smth` into `this.smth = smth`
<!-- * Where is it best to define readingSpeed -->
<!-- * Structure for users and account service and routes -->
<!-- * Can/should I use interfaces from prisma in services? -->
<!-- * DTO for query params? or just interface? -->
* how to set global options for pipe? Javohir's example isn't working :(
   {trasform: true, transformOptions: { enableImplicitConversion: true }}
<!-- * how to attach user to request and should I? -->
<!-- * auth using guard instead of middleware? -->
<!-- * is it ok to use dto as interface in service (e.g. getUsers())
: YES -->
<!-- * throw error instead of returning false in canActivate()
Answer: YES -->
