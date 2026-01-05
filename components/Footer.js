"use client";

import { useTranslation } from "next-i18next";


export default function Footer() {
  const { t } = useTranslation("common");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bgBlue)] text-white">
      <div
        className="px-4 lg:px-[120px] md:px-[100px] py-[64px] flex flex-wrap gap-[64px] 
  max-[1250px]:grid max-[1250px]:grid-cols-2 max-[1250px]:gap-10 
  max-[761px]:flex max-[761px]:flex-col max-[700px]:py-6 max-[700px]:gap-4"
      >

        {/* Services */}
        <div className="w-fit max-w-[192px] flex flex-col gap-6 max-[700px]:w-full max-[700px]:gap-4">
          <h3 className="font-[600] text-[25px] max-[700px]:text-[18px]">
            {t("footer.ImportantLinks")}
          </h3>

        </div>

        {/* ContactUs */}
        <div className="w-fit max-w-[200px]  flex flex-col gap-6 max-[700px]:w-full max-[700px]:gap-4">
          <h3 className="font-[600] text-[24px] max-[700px]:text-[18px]">
            {t("footer.ContactUs")}
          </h3>

        </div>


      </div>

    </footer>
  );
}
