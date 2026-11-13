using System.Text;
Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
return Encoding.GetEncoding(1252).GetBytes("é")[0] == 0xE9 ? 0 : 1;
