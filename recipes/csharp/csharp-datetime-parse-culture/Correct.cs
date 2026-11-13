using System.Globalization;
CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;
return DateTime.ParseExact("13/01/2026", "dd/MM/yyyy", CultureInfo.InvariantCulture).Month == 1 ? 0 : 1;
