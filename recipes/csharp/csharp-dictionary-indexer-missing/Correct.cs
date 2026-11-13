var d = new Dictionary<string, string>();
return d.GetValueOrDefault("theme", "light") == "light" ? 0 : 1;
