def create(name:, age:) = [name, age]
opts = { name: "Ada", age: 36 }
abort unless create(**opts) == ["Ada", 36]
