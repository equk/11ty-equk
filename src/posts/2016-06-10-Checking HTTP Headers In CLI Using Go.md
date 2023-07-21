---
slug:
title: "Checking HTTP Headers Using Go"
date: 2016-06-10T22:21:07.061Z
draft: false
author: equilibriumuk
tags:
  - linux
  - github
  - security
  - infosec
  - golang
  - cli
image:
---

## Why Check HTTP Headers

Checking headers can be useful for debugging problems and also for testing website security.
<br/>In a lot of cases you can tell if the server you are hitting is a reverse proxy (eg: cloudflare) & what software is running (eg: nginx).
<br/>You can also tell if the server is using PHP in some cases.

Some example headers modern HTTPS webservers should have:

- HTTP Strict Transport Security
- X Frame Options
- X Xss Protection
- Cache-Control
- Content Security Policy

## Simple GET

The core Go package `net/http` is really easy to use.

Here is a simple example of a get request which returns the HTTP response headers.

```go
func main() {
    response, err := http.Get("https://github.com")

    if err != nil {
        log.Fatal(err)
    }

    defer response.Body.Close()

    for a, b := range response.Header {
        fmt.Print(a)
        fmt.Print(" : ")
        fmt.Println(b)
    }
}
```

You should see something similar to this

```sh
Strict-Transport-Security : [max-age=31536000; includeSubdomains; preload]
Content-Type : [text/html; charset=utf-8]
X-Frame-Options : [deny]
-- snip --
```

## Adding CLI Options

We have a tool which only checks the domain hard coded to it.
<br/>It would be beneficial to have the ability to pass in a `URL` in the commandline.

In Go this can be done using `os.Args`.
<br />We can replace the query line with a argument provided.

```diff
-    response, err := http.Get("https://github.com")
+    response, err := http.Get(os.Args[1])
```

Now we can run `go run header.go github.com` to get the same output but we now have a problem when there is no input so we need to check for inputs.
<br/>We also want to provide the user with some feedback regarding the program usage before exiting.

```go
    if len(os.Args) < 2 {
        fmt.Println("Error: no arguments specified")
        fmt.Println("Usage:", os.Args[0], "URL")
        fmt.Println("Example:", os.Args[0], "https://github.com")
        return
    }
```

## Final Code

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {

    if len(os.Args) < 2 {
        fmt.Println("Error: no arguments specified")
        fmt.Println("Usage:", os.Args[0], "URL")
        fmt.Println("Example:", os.Args[0], "https://github.com")
        return
    }

    response, err := http.Get(os.Args[1])

    if err != nil {
        log.Fatal(err)
    }

    defer response.Body.Close()

    fmt.Println("Running GET on URL :", os.Args[1], "\n")

    for a, b := range response.Header {
        fmt.Print(a)
        fmt.Print(" : ")
        fmt.Println(b)
    }

}
```

This is a really simple script but can be added to larger projects & used to automate things like server configuration checks.