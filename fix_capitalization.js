const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateTitles() {
  const updates = [
    {
      oldSlug: 'giai-ma-yeu-huyet-khi-to-chuc-teambuilding-tai-bien-nha-trang',
      newTitle: 'Giải mã yếu huyệt khi tổ chức teambuilding tại biển Nha Trang'
    },
    {
      oldSlug: 'tuyet-voi-hoa-dem-gala-dinner-duoi-chu-de-the-oscars',
      newTitle: 'Tuyệt vời hóa đêm Gala Dinner dưới chủ đề The Oscars'
    },
    {
      oldSlug: 'ung-dao-su-co-chay-no-sap-dien-dot-ngot-tai-su-kien-lon',
      newTitle: 'Ứng đảo sự cố cháy nổ, sập điện đột ngột tại sự kiện lớn'
    }
  ];

  for (const update of updates) {
    const { data, error } = await supabase
      .from('posts')
      .update({ title: update.newTitle })
      .eq('slug', update.oldSlug);

    if (error) {
      console.error('Error updating', update.oldSlug, error);
    } else {
      console.log('Successfully updated title for', update.oldSlug);
    }
  }
}

updateTitles();
