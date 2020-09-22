using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Projem.Controllers
{
    public class MusteriController:ApiController
    {
        mobil_projeEntities1 _ent = new mobil_projeEntities1();

        [HttpGet]
        public void Sepetekle(int mId,int uId)
        {
            Sepet s = new Sepet();
            s.mId = mId;
            s.uId = uId;
            _ent.Sepet.Add(s);
            _ent.SaveChanges();
            // alert eklendi **
            
        }

        [HttpGet] 
        public List<SepetTip> MusteriSepetListele(int mId)
        {
            return _ent.Sepet.Where(p => p.mId == mId).Select(p => new SepetTip {
                urunfiyat = p.Ürünler.urun_fiyat,
                urunadi = p.Ürünler.urun_isim,
                m_adi = p.Müşteri.adi,
                m_soyadi = p.Müşteri.soyadi

            }).ToList();
        }

    }

    public class SepetTip
    {
        public int sId { get; set; }
        public int uId { get; set; }
        public int mId { get; set; }
        public string m_adi { get; set; }
        public string m_soyadi { get; set; }
        public string urunadi { get; set; }
        public string urunfiyat { get; set; }

    }

}