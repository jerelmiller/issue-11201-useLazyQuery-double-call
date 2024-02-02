# Reproduction of issue [#11201](https://github.com/apollographql/apollo-client/issues/11201)

This repo shows a reproduction of the double network call and how the snapshot
release in [#11403](https://github.com/apollographql/apollo-client/pull/11403) fixes it. To see the old behavior, change the
`@apollo/client` version in package.json to anything < 3.9.2.
