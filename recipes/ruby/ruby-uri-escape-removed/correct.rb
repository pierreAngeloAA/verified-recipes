require "uri"
abort unless URI.encode_www_form(q: "a b&c") == "q=a+b%26c"
