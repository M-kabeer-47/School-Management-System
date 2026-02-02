"use client";

import { ChallanData } from "@/lib/admin/types/finance";

interface ChallanPrintTemplateProps {
    challan: ChallanData;
    schoolName?: string;
    schoolAddress?: string;
}

export function ChallanPrintTemplate({
    challan,
    schoolName = "City Public School",
    schoolAddress = "Islamabad, Pakistan"
}: ChallanPrintTemplateProps) {
    const invoiceNo = `1002${challan.challanNo.replace(/\D/g, '')}01002555`;
    const issueDate = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // Calculate late fee amounts
    const baseAmount = challan.total;
    const lateFee1 = Math.round(baseAmount * 0.02); // 2% late fee
    const lateFee2 = Math.round(baseAmount * 0.04); // 4% late fee

    // Due dates
    const dueDate1 = challan.dueDate;
    const dueDate2 = new Date(new Date(challan.dueDate).getTime() + 12 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');
    const dueDate3 = new Date(new Date(challan.dueDate).getTime() + 20 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');

    const ChallanCopy = ({ copyType }: { copyType: "Bank Copy" | "Account Copy" | "Student Copy" }) => (
        <div className="challan-copy border border-gray-400 text-[10px] leading-tight" style={{ width: '32%', fontSize: '10px' }}>
            {/* Invoice Header */}
            <div className="flex justify-between items-center px-2 py-1 border-b border-gray-400 bg-gray-50">
                <span className="font-bold">Invoice#</span>
                <span className="font-mono text-[9px]">{invoiceNo}</span>
            </div>

            {/* Pay Through Section */}
            <div className="px-2 py-1 border-b border-gray-400 text-center bg-blue-50">
                <div className="font-bold text-blue-800">PAY THROUGH</div>
                <div className="text-[8px] text-blue-600">Internet Banking / ATMs /Mobile Apps</div>
            </div>

            {/* Allied Bank */}
            <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-300 bg-red-50">
                <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white font-bold text-[8px]">ABL</div>
                <div className="flex-1">
                    <div className="font-bold text-red-800">ALLIED BANK LTD</div>
                    <div className="text-[8px]">Institutional Fee Collection : 105 ({schoolName.split(' ')[0].toUpperCase()})</div>
                    <div className="text-[8px]">Challan#:{challan.challanNo.replace(/\D/g, '')}</div>
                </div>
            </div>

            {/* Habib Bank */}
            <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-400 bg-green-50">
                <div className="w-6 h-6 bg-green-700 rounded flex items-center justify-center text-white font-bold text-[8px]">HBL</div>
                <div className="flex-1">
                    <div className="font-bold text-green-800">HABIB BANK LTD</div>
                    <div className="text-[8px]">Provided Code : "30"</div>
                    <div className="text-[8px]">Challan#:{challan.challanNo.replace(/\D/g, '')}</div>
                </div>
            </div>

            {/* Copy Type Header */}
            <div className="text-center py-1 bg-gray-200 font-bold border-b border-gray-400">
                {copyType}
            </div>

            {/* Issue Date & School */}
            <div className="flex border-b border-gray-400">
                <div className="w-1/3 px-2 py-1 bg-gray-100 font-semibold border-r border-gray-300">Issue Date</div>
                <div className="w-2/3 px-2 py-1 font-medium">{issueDate}</div>
            </div>

            {/* School Name */}
            <div className="text-center py-2 border-b border-gray-400 bg-blue-50">
                <div className="font-bold text-blue-900">{schoolName}</div>
                <div className="text-[8px] text-gray-600">{schoolAddress}</div>
            </div>

            {/* Student Details */}
            <div className="border-b border-gray-400">
                <div className="flex border-b border-gray-300">
                    <div className="w-1/3 px-2 py-1 bg-gray-100 font-semibold">Reg No</div>
                    <div className="w-2/3 px-2 py-1 font-mono text-blue-700 font-bold">{challan.admissionNo}</div>
                </div>
                <div className="flex border-b border-gray-300">
                    <div className="w-1/3 px-2 py-1 bg-gray-100 font-semibold">Name</div>
                    <div className="w-2/3 px-2 py-1 font-bold text-blue-800">{challan.studentName}</div>
                </div>
                <div className="flex border-b border-gray-300">
                    <div className="w-1/3 px-2 py-1 bg-gray-100 font-semibold">Father Name</div>
                    <div className="w-2/3 px-2 py-1 font-bold text-blue-800">{challan.fatherName}</div>
                </div>
                <div className="flex border-b border-gray-300">
                    <div className="w-1/3 px-2 py-1 bg-gray-100 font-semibold">Class</div>
                    <div className="w-2/3 px-2 py-1">{challan.class}</div>
                </div>
                <div className="flex">
                    <div className="w-1/3 px-2 py-1 bg-gray-100 font-semibold">Section</div>
                    <div className="w-2/3 px-2 py-1">{challan.section}</div>
                </div>
            </div>

            {/* Fee Status Row */}
            <div className="flex border-b border-gray-400 bg-gray-50">
                <div className="w-1/3 px-2 py-1 font-semibold">Status</div>
                <div className="w-1/3 px-2 py-1 text-center border-l border-gray-300">Month</div>
                <div className="w-1/3 px-2 py-1 text-center border-l border-gray-300 font-medium">{challan.month}</div>
            </div>

            {/* Fee Breakdown Table */}
            <div className="border-b border-gray-400">
                <div className="flex bg-gray-200 font-bold border-b border-gray-400">
                    <div className="w-2/3 px-2 py-1 border-r border-gray-300">Description</div>
                    <div className="w-1/3 px-2 py-1 text-right">Amount (Rupees)</div>
                </div>
                {challan.items.map((item, idx) => (
                    <div key={idx} className="flex border-b border-gray-200">
                        <div className="w-2/3 px-2 py-1 border-r border-gray-200">{item.name}</div>
                        <div className="w-1/3 px-2 py-1 text-right font-mono">{item.amount.toLocaleString()}</div>
                    </div>
                ))}
            </div>

            {/* Total with Due Dates */}
            <div className="border-b border-gray-400 bg-yellow-50">
                <div className="flex border-b border-gray-300 font-semibold">
                    <div className="w-2/3 px-2 py-1">Total Fee Upto {dueDate1}</div>
                    <div className="w-1/3 px-2 py-1 text-right font-bold font-mono">{baseAmount.toLocaleString()}</div>
                </div>
                <div className="flex border-b border-gray-300">
                    <div className="w-2/3 px-2 py-1">Total Fee Upto {dueDate2}</div>
                    <div className="w-1/3 px-2 py-1 text-right font-mono">{(baseAmount + lateFee1).toLocaleString()}</div>
                </div>
                <div className="flex">
                    <div className="w-2/3 px-2 py-1">Total Fee Upto {dueDate3}</div>
                    <div className="w-1/3 px-2 py-1 text-right font-mono">{(baseAmount + lateFee2).toLocaleString()}</div>
                </div>
            </div>

            {/* Bank Stamp Section */}
            <div className="text-center py-3 border-b border-gray-400">
                <div className="font-semibold text-gray-600">Bank Stamp & Signature</div>
                <div className="h-12 border border-dashed border-gray-300 mx-4 mt-2 rounded"></div>
            </div>

            {/* Barcode */}
            <div className="text-center py-2">
                <div className="font-mono text-[8px] tracking-widest">
                    |||||||||||||||||||||||||||||||||||
                </div>
                <div className="font-mono text-[7px] mt-1">{challan.challanNo}</div>
            </div>
        </div>
    );

    return (
        <div className="challan-print-container bg-white p-4" style={{ width: '100%', maxWidth: '900px' }}>
            {/* Three Copies Side by Side */}
            <div className="flex gap-2 justify-between">
                <ChallanCopy copyType="Bank Copy" />
                <ChallanCopy copyType="Account Copy" />
                <ChallanCopy copyType="Student Copy" />
            </div>

            {/* Payment Instructions */}
            <div className="mt-4 text-[9px] text-gray-600 border-t pt-2">
                <div className="font-bold">For Payment Through 1Bill:</div>
                <ul className="list-disc list-inside ml-2">
                    <li>Login to any bank's Mobile App</li>
                    <li>Go to 1Bill invoice option</li>
                    <li>Enter 1-Bill invoice Challan Number</li>
                    <li>Double Check the information that appears on screen</li>
                    <li>Proceed to payment</li>
                </ul>
            </div>
        </div>
    );
}
