---
id: docker-cmd-json-args
title: Use JSON (exec form) for CMD and ENTRYPOINT
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "signals", "cmd"]
errors: ["JSON arguments recommended for CMD to prevent unintended behavior related to OS signals"]
sources: ["https://docs.docker.com/reference/build-checks/json-args-recommended/"]
---

## Mistake

```dockerfile
CMD npm start
```

## Correct

```dockerfile
CMD ["npm", "start"]
```

## Why

Shell form runs under `/bin/sh -c`, so the app is not PID 1 and never gets SIGTERM: `docker stop` waits 10 s and kills it.
