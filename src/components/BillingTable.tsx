import React from 'react';
import { BillItem, CategoryType } from '../types';
import { formatNumber, formatRupiah } from '../utils/formatters';
import { Check } from 'lucide-react';

interface BillingTableProps {
  items: BillItem[];
  onToggleItem: (id: string) => void;
  subtotal: number;
}

export const BillingTable: React.FC<BillingTableProps> = ({
  items,
  onToggleItem,
  subtotal,
}) => {
  const categories: CategoryType[] = ['Tindakan', 'Laboratorium', 'Resep Obat'];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[620px]">
        {/* Table Header */}
        <thead>
          <tr className="bg-[#5663f6] text-white text-[13px] sm:text-[14px] font-semibold border-b border-indigo-400">
            <th className="py-2.5 px-4 font-semibold border-r border-indigo-400/60 w-[46%]">
              Item Tindakan & Pemeriksaan Laboratorium
            </th>
            <th className="py-2.5 px-3 font-semibold text-center border-r border-indigo-400/60 w-[10%]">
              Jumlah
            </th>
            <th className="py-2.5 px-4 font-semibold text-right border-r border-indigo-400/60 w-[17%]">
              Tarif
            </th>
            <th className="py-2.5 px-4 font-semibold text-right border-r border-indigo-400/60 w-[17%]">
              Total Tarif
            </th>
            <th className="py-2.5 px-3 font-semibold text-center w-[10%]">
              Status
            </th>
          </tr>
        </thead>

        {/* Table Body by Categories */}
        <tbody className="divide-y divide-indigo-100/60 text-[13px] sm:text-[13.5px] text-slate-800">
          {categories.map((category) => {
            const categoryItems = items.filter((it) => it.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <React.Fragment key={category}>
                {/* Category Header Row */}
                <tr className="bg-slate-50/70">
                  <td
                    colSpan={5}
                    className="py-2 px-4 font-bold text-slate-900 border-r border-indigo-100/70"
                  >
                    {category}
                  </td>
                </tr>

                {/* Category Item Rows */}
                {categoryItems.map((item) => {
                  const lineTotal = item.quantity * item.unitPrice;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-indigo-50/40 transition-colors ${
                        !item.selected ? 'opacity-50 line-through bg-slate-50/30' : ''
                      }`}
                    >
                      {/* Item Name with Checkbox */}
                      <td className="py-2 px-4 border-r border-indigo-100/70">
                        <label className="inline-flex items-center space-x-2.5 cursor-pointer select-none">
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              onToggleItem(item.id);
                            }}
                            className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                              item.selected
                                ? 'bg-[#5663f6] border-[#5663f6] text-white shadow-xs'
                                : 'bg-white border-slate-300'
                            }`}
                          >
                            {item.selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </span>
                          <span className="font-normal text-slate-800">
                            {item.name}
                            {item.dosageNote && (
                              <span className="text-slate-600 ml-1.5 font-normal">
                                {item.dosageNote}
                              </span>
                            )}
                          </span>
                        </label>
                      </td>

                      {/* Jumlah */}
                      <td className="py-2 px-3 text-center border-r border-indigo-100/70 font-medium">
                        {item.quantity}
                      </td>

                      {/* Tarif Satuan */}
                      <td className="py-2 px-4 text-right border-r border-indigo-100/70 text-slate-700">
                        Rp {formatNumber(item.unitPrice)}
                      </td>

                      {/* Total Tarif */}
                      <td className="py-2 px-4 text-right border-r border-indigo-100/70 font-medium text-slate-900">
                        Rp {formatNumber(lineTotal)}
                      </td>

                      {/* Status */}
                      <td className="py-2 px-3 text-center text-slate-500">
                        {item.status || '-'}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}

          {/* Subtotal Summary Row matching screenshot */}
          <tr className="bg-[#dce2fd] font-bold text-[13.5px] sm:text-[14px] text-slate-900 border-t border-indigo-200">
            <td colSpan={3} className="py-2.5 px-4 border-r border-indigo-200/80">
              Total Tarif
            </td>
            <td className="py-2.5 px-4 text-right border-r border-indigo-200/80">
              {formatRupiah(subtotal)}
            </td>
            <td className="py-2.5 px-3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
