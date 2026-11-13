var l = new List<int> { 1, 2, 3 };
l.RemoveAll(x => x == 1);
return l.Count == 2 ? 0 : 1;
