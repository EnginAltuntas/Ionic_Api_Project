using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;


namespace Projem.Controllers
{
    public class GirisController : ApiController
    {

        mobil_projeEntities1 _ent = new mobil_projeEntities1();

        [HttpGet]
        public List<UrunTip> ürün_listele()
        {
                return _ent.Ürünler.Select(p => new UrunTip()
                {
                    uId = p.uId,
                    urun_isim = p.urun_isim,
                    urun_fiyat = p.urun_fiyat

                }).ToList();

        }


        [HttpGet]
        public int kullanici_kontrol(string ka, string s)
        {
            Kullanicilar k = _ent.Kullanicilar.FirstOrDefault(p => p.kullanici_adi == ka && p.sifre == s);
            if (k == null) return 0;
            Yönetici y = _ent.Yönetici.FirstOrDefault(p => p.kId == k.kId);

            if (k != null && y != null)
            {
                return 9191;

            }
            else if(k != null && y == null)
            {
                Müşteri m = _ent.Müşteri.FirstOrDefault(p => p.kId == k.kId);
                return m.mId;
                //müşteri listelemesi
            }
            else
                return 0;
           // gelen kullanıcı adı ve şifreyi kullanıcılarda kontrol et yoksa hata ver, varsa yönetici mi müşterimi kontrol et
        }
        [HttpGet]
        public List<UrunTip> Urun_ayrinti(int ürün_id)
        {
         return _ent.Ürünler.Where(p => p.uId == ürün_id).Select(p => new UrunTip() {
                urun_isim=p.urun_isim,
                urun_fiyat=p.urun_fiyat
            }).ToList();

        }

        [HttpGet]
        public bool ürün_güncelle(int uId, string isim,string fiyat)
        {
            try
            {
                Ürünler eski = _ent.Ürünler.Find(uId);
                eski.urun_isim = isim;
                eski.urun_fiyat = fiyat;

                _ent.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }


        [HttpGet]
        public List<UrunTip> Ürün_ekle(string isim,string fiyat)
        {
            try
            {
                Ürünler u = new Ürünler();
                u.urun_isim = isim;
                u.urun_fiyat = fiyat;
                _ent.Ürünler.Add(u);
                _ent.SaveChanges();
                return ürün_listele();
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }

        [HttpGet]
        public List<UrunTip> Ürünsil(int uId)
        {
            try
            {
                List<Sepet> sepetkaydı = _ent.Sepet.Where(p => p.uId == uId).ToList();
                if(sepetkaydı !=null)
                {
                    _ent.Sepet.RemoveRange(sepetkaydı);
                    _ent.SaveChanges();
                }
                _ent.Ürünler.Remove(_ent.Ürünler.Find(uId));
                _ent.SaveChanges();
                return ürün_listele();
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }


    }


    public class UrunTip
    {
        public int uId { get; set; }
        public string urun_isim { get; set; }
        public string urun_fiyat { get; set; }
    }

    public class KullanıcıTip
    {
        public int kId { get; set; }
        public int mId { get; set; }
        public string kullanici_adi { get; set; }
        public string sifre { get; set; }

    }

}