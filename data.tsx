import React, { useState } from 'react';
import {
  Car,
  Film,
  Gift,
  Zap,
  CheckCircle2,
  Mic,
  AlertTriangle,
  RotateCcw,
  Star,
  ClipboardCheck
} from 'lucide-react';
import { Lesson, VocabItem, ExerciseItem, QuizQuestion } from './types';

// --- COMPONENTS FOR CONTENT ---

const VocabTable: React.FC<{ items: VocabItem[], colorTheme: string }> = ({ items, colorTheme }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className={`${colorTheme} text-white`}>
          <tr>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Từ vựng (Word)</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Phiên âm & Loại từ</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Nghĩa tiếng Việt dễ hiểu</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <span className="font-bold text-gray-900 text-base block">{item.word}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-md border border-gray-200">{item.ipa}</span>
              </td>
              <td className="px-6 py-4 text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: item.meaning }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GrammarBox: React.FC<{
  title: string;
  rule: React.ReactNode;
  examples: { correct: string; incorrect?: string; explain?: string }[];
  color: string
}> = ({ title, rule, examples, color }) => (
  <div className="mb-8 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
    <div className={`${color} px-6 py-4 border-b border-white/10`}>
      <h3 className="text-white font-bold text-lg flex items-center gap-2">
        <Zap className="w-5 h-5 fill-current" /> {title}
      </h3>
    </div>
    <div className="p-6">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 font-medium text-gray-800">
        {rule}
      </div>
      <div className="space-y-4">
        {examples.map((ex, idx) => (
          <div key={idx} className="relative pl-4 border-l-4 border-l-transparent hover:border-l-indigo-500 transition-all">
            <div className="flex items-start gap-3 mb-1">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-green-800 font-medium bg-green-50 px-2 py-1 rounded inline-block">{ex.correct}</p>
            </div>
            {ex.incorrect && (
              <div className="flex items-start gap-3 mb-1">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-800 line-through decoration-red-500/50 bg-red-50 px-2 py-1 rounded inline-block">{ex.incorrect}</p>
              </div>
            )}
            {ex.explain && (
              <p className="text-sm text-gray-600 ml-8 mt-1 border-t border-dashed border-gray-200 pt-1">💡 <strong>Mẹo:</strong> {ex.explain}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExerciseCard: React.FC<{ item: ExerciseItem, idx: number }> = ({ item, idx }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm shrink-0">
          {idx + 1}
        </span>
        <div className="grow">
          <p className="font-medium text-gray-800 text-lg mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.question }}></p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
            </button>
          </div>
          {showAnswer && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-green-800 font-bold block mb-1">Câu trả lời dễ hiểu:</span>
                <span className="text-green-900" dangerouslySetInnerHTML={{ __html: item.answer }}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PhoneticCard: React.FC<{ pair: string, words: string[], tip: string }> = ({ pair, words, tip }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-indigo-200 transition-colors h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">{pair}</span>
      <Mic className="text-gray-400 w-6 h-6" />
    </div>
    <div className="flex flex-wrap gap-2 mb-4 grow content-start">
      {words.map((w, i) => (
        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-base font-medium border border-gray-200 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default">
          {w}
        </span>
      ))}
    </div>
    <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-auto leading-relaxed">
      <span className="font-bold text-yellow-700">Mẹo đọc:</span> {tip}
    </p>
  </div>
);

// --- UNIT 7: TRAFFIC ---

const unit7Vocab: VocabItem[] = [
  { word: "Traffic jam", ipa: "/ˈtræfɪk dʒæm/ (n)", meaning: "<strong>Tắc đường, kẹt xe</strong>.<br/><em class='text-xs text-gray-500'>Đường phố đông đúc xe cộ không đi được.</em>" },
  { word: "Distance", ipa: "/ˈdɪstəns/ (n)", meaning: "<strong>Khoảng cách</strong>.<br/><em class='text-xs text-gray-500'>Độ dài giữa 2 điểm (ví dụ: quãng đường từ nhà tới trường).</em>" },
  { word: "Road sign", ipa: "/rəʊd saɪn/ (n)", meaning: "<strong>Biển báo giao thông</strong>.<br/><em class='text-xs text-gray-500'>Các biển báo màu xanh/đỏ/vàng trên đường.</em>" },
  { word: "Vehicle", ipa: "/ˈviːəkl/ (n)", meaning: "<strong>Xe cộ nói chung</strong>.<br/><em class='text-xs text-gray-500'>Bao gồm ô tô, xe máy, xe đạp...</em>" },
  { word: "Passenger", ipa: "/ˈpæsɪndʒə/ (n)", meaning: "<strong>Hành khách</strong>.<br/><em class='text-xs text-gray-500'>Người ngồi trên xe buýt, máy bay, tàu hỏa...</em>" },
  { word: "Pedestrian", ipa: "/pəˈdestriən/ (n)", meaning: "<strong>Người đi bộ</strong>.<br/><em class='text-xs text-gray-500'>Người tham gia giao thông bằng cách đi bộ.</em>" },
  { word: "Zebra crossing", ipa: "/ˌzebrə ˈkrɒsɪŋ/ (n)", meaning: "<strong>Vạch kẻ sang đường</strong>.<br/><em class='text-xs text-gray-500'>Vạch trắng đen trên đường cho người đi bộ.</em>" },
  { word: "Pavement", ipa: "/ˈpeɪvmənt/ (n)", meaning: "<strong>Vỉa hè</strong>.<br/><em class='text-xs text-gray-500'>Phần lề đường dành riêng cho người đi bộ.</em>" },
  { word: "Fine", ipa: "/faɪn/ (v, n)", meaning: "<strong>Phạt tiền / Tiền phạt</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: Cảnh sát phạt vì không đội mũ bảo hiểm.</em>" },
  { word: "Obey", ipa: "/əˈbeɪ/ (v)", meaning: "<strong>Tuân thủ, vâng lời</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: Obey traffic rules (tuân thủ luật giao thông).</em>" },
  { word: "No cycling", ipa: "/nəʊ ˈsaɪklɪŋ/ (phrase)", meaning: "<strong>Biển cấm đi xe đạp</strong>.<br/><em class='text-xs text-gray-500'>Biển báo có hình xe đạp bị gạch chéo.</em>" },
  { word: "School ahead", ipa: "/skuːl əˈhed/ (phrase)", meaning: "<strong>Phía trước có trường học</strong>.<br/><em class='text-xs text-gray-500'>Biển báo chú ý chạy chậm vì có học sinh.</em>" },
];

const unit7Exercises: ExerciseItem[] = [
  { id: 1, question: "______ is it from your house to the school?<br/>A. How far B. How long C. How often", answer: "<strong>A. How far</strong>.<br/>Dùng <em>How far</em> để hỏi về khoảng cách (bao xa)." },
  { id: 2, question: "You ______ ride your bike too fast. It's dangerous.<br/>A. should B. shouldn't C. must", answer: "<strong>B. shouldn't</strong>.<br/>Nghĩa là 'không nên'. Vì đạp xe nhanh rất nguy hiểm nên ta khuyên 'không nên'." },
  { id: 3, question: "Find the word with the different sound:<br/>A. f<u>i</u>ne B. s<u>i</u>gn C. <u>i</u>t", answer: "<strong>C. it</strong>.<br/>Từ 'it' phát âm là chữ 'i' ngắn /ɪ/. Còn 'fine' và 'sign' đều đọc âm /aɪ/ (gần giống chữ 'ai')." },
  { id: 4, question: "Walk across the street at the ______ .<br/>A. zebra crossing B. seatbelt C. fine", answer: "<strong>A. zebra crossing</strong>.<br/>Nghĩa: Đi sang đường ở chỗ 'vạch kẻ người đi bộ' (zebra crossing)." },
];

// --- UNIT 8: FILMS ---

const unit8Vocab: VocabItem[] = [
  { word: "Comedy", ipa: "/ˈkɒmədi/ (n)", meaning: "<strong>Phim hài</strong>.<br/><em class='text-xs text-gray-500'>Phim rất buồn cười, giúp bạn cười nhiều.</em>" },
  { word: "Documentary", ipa: "/ˌdɒkjuˈmentri/ (n)", meaning: "<strong>Phim tài liệu</strong>.<br/><em class='text-xs text-gray-500'>Phim về thế giới thực: động vật, lịch sử, con người.</em>" },
  { word: "Horror film", ipa: "/ˈhɒrə fɪlm/ (n)", meaning: "<strong>Phim kinh dị</strong>.<br/><em class='text-xs text-gray-500'>Phim có ma, quái vật, làm bạn sợ hãi.</em>" },
  { word: "Science fiction", ipa: "/ˌsaɪəns ˈfɪkʃn/ (n)", meaning: "<strong>Phim khoa học viễn tưởng</strong>.<br/><em class='text-xs text-gray-500'>Phim về robot, du hành vũ trụ. (Thường viết tắt: Sci-fi).</em>" },
  { word: "Fantasy", ipa: "/ˈfæntəsi/ (n)", meaning: "<strong>Phim giả tưởng</strong>.<br/><em class='text-xs text-gray-500'>Phim có phép thuật, phù thuỷ, thế giới kì ảo.</em>" },
  { word: "Frightening", ipa: "/ˈfraɪtnɪŋ/ (adj)", meaning: "<strong>Đáng sợ (làm rùng rợn)</strong>.<br/><em class='text-xs text-gray-500'>Giống như 'scary'. Dùng để tả phim kinh dị.</em>" },
  { word: "Moving", ipa: "/ˈmuːvɪŋ/ (adj)", meaning: "<strong>Cảm động</strong>.<br/><em class='text-xs text-gray-500'>Phim làm bạn muốn khóc vì thương cảm.</em>" },
  { word: "Gripping", ipa: "/ˈɡrɪpɪŋ/ (adj)", meaning: "<strong>Rất hấp dẫn, lôi cuốn</strong>.<br/><em class='text-xs text-gray-500'>Phim hay đến mức bạn không thể rời mắt.</em>" },
  { word: "Confusing", ipa: "/kənˈfjuːzɪŋ/ (adj)", meaning: "<strong>Đáng bối rối, khó hiểu</strong>.<br/><em class='text-xs text-gray-500'>Phim mà xem xong bạn chẳng hiểu gì cả.</em>" },
  { word: "Dull", ipa: "/dʌl/ (adj)", meaning: "<strong>Buồn tẻ, chán ngắt</strong>.<br/><em class='text-xs text-gray-500'>Giống như 'boring', khiến bạn buồn ngủ.</em>" },
  { word: "Review", ipa: "/rɪˈvjuː/ (n)", meaning: "<strong>Bài đánh giá (review)</strong>.<br/><em class='text-xs text-gray-500'>Bài nhận xét xem phim có hay hay không.</em>" },
  { word: "Star", ipa: "/stɑː/ (v, n)", meaning: "<strong>Đóng vai chính / Ngôi sao điện ảnh</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: Phim này có Tom Cruise đóng chính.</em>" },
];

const unit8Exercises: ExerciseItem[] = [
  { id: 1, question: "______ he is young, he acts very well.<br/>A. However B. Although C. But", answer: "<strong>B. Although</strong>.<br/>Cấu trúc: Although + Mệnh đề 1, Mệnh đề 2. Nghĩa: <em>Mặc dù</em> cậu bé rât trẻ, <em>nhưng</em> diễn xuất rất giỏi. (Lưu ý: Đã dùng Although thì không có But)." },
  { id: 2, question: "The film was very sad. ______, she didn't cry.<br/>A. Although B. However C. So", answer: "<strong>B. However</strong>.<br/>However đứng đầu câu thứ hai, sau dấu chấm, và có dấu phẩy đi sau. Nghĩa: Bộ phim rất buồn. <em>Tuy nhiên</em>, cô ấy không khóc." },
  { id: 3, question: "I didn't like the film. It was very ______.<br/>A. gripping B. moving C. dull", answer: "<strong>C. dull</strong>.<br/>Tôi không thích phim đó. Vì nó rất <em>tẻ nhạt, chán ngắt (dull)</em>." },
  { id: 4, question: "Find the word with the different sound:<br/>A. h<u>ea</u>r B. cl<u>ea</u>r C. b<u>ea</u>r", answer: "<strong>C. bear</strong>.<br/>Từ 'bear' đọc là /eə/ (như chữ e-ờ). Còn 'hear' và 'clear' đọc âm /ɪə/ (như chữ i-a)." },
];

// --- UNIT 9: FESTIVALS ---

const unit9Vocab: VocabItem[] = [
  { word: "Celebrate", ipa: "/ˈselɪbreɪt/ (v)", meaning: "<strong>Tổ chức ăn mừng, kỉ niệm</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: Chúng ta 'celebrate' Tết cùng gia đình.</em>" },
  { word: "Feast", ipa: "/fiːst/ (n)", meaning: "<strong>Bữa tiệc thịnh soạn lớn</strong>.<br/><em class='text-xs text-gray-500'>Bữa ăn lớn có rất nhiều đồ ăn ngon.</em>" },
  { word: "Costume", ipa: "/ˈkɒstjuːm/ (n)", meaning: "<strong>Trang phục biểu diễn/hóa trang</strong>.<br/><em class='text-xs text-gray-500'>Đồ mặc dịp Halloween hoặc lễ hội múa.</em>" },
  { word: "Perform", ipa: "/pəˈfɔːm/ (v)", meaning: "<strong>Biểu diễn / Trình diễn</strong>.<br/><em class='text-xs text-gray-500'>Hát, múa trên sân khấu. Sinh ra danh từ Performance.</em>" },
  { word: "Parade", ipa: "/pəˈreɪd/ (n)", meaning: "<strong>Cuộc diễu hành</strong>.<br/><em class='text-xs text-gray-500'>Mọi người đi thành hàng dài trên đường phố.</em>" },
  { word: "Carve pumpkins", ipa: "/kɑːv ˈpʌmpkɪnz/ (phrase)", meaning: "<strong>Khắc bí ngô, tỉa bí ngô</strong>.<br/><em class='text-xs text-gray-500'>Hoạt động cực phổ biến ngày Halloween.</em>" },
  { word: "Eat turkey", ipa: "/iːt ˈtɜːki/ (phrase)", meaning: "<strong>Ăn gà tây</strong>.<br/><em class='text-xs text-gray-500'>Món ăn truyền thống của Lễ Tạ ơn (Thanksgiving).</em>" },
  { word: "Paint eggs", ipa: "/peɪnt eɡz/ (phrase)", meaning: "<strong>Sơn/vẽ trứng</strong>.<br/><em class='text-xs text-gray-500'>Hoạt động của trẻ con vào Lễ Phục Sinh (Easter).</em>" },
  { word: "Lion dance", ipa: "/ˈlaɪən dɑːns/ (n)", meaning: "<strong>Múa lân</strong>.<br/><em class='text-xs text-gray-500'>Thường múa vào dịp Tết Trung Thu (Mid-Autumn).</em>" },
  { word: "Fireworks display", ipa: "/ˈfaɪəwɜːks dɪˈspleɪ/ (n)", meaning: "<strong>Bắn/Trình diễn pháo hoa</strong>.<br/><em class='text-xs text-gray-500'>Xem pháo hoa đêm giao thừa.</em>" },
];

const unit9Exercises: ExerciseItem[] = [
  { id: 1, question: "______ they eat moon cakes at the festival last year?<br/>A. Do B. Did C. Are", answer: "<strong>B. Did</strong>.<br/>Câu hỏi (Yes/No Question) thì quá khứ đơn (vì có chữ <em>last year</em>). Ta mượn trợ động từ <em>Did</em> đưa lên đầu." },
  { id: 2, question: "______ you watching the parade now?<br/>A. Do B. Are C. Did", answer: "<strong>B. Are</strong>.<br/>Đây là Thì Hiện tại tiếp diễn (có <em>now</em> và V-ing <em>watching</em>). Phải dùng to-be là <em>Are</em>." },
  { id: 3, question: "Which word has stress on the FIRST syllable? (Nhấn âm 1)<br/>A. enjoy B. prepare C. turkey", answer: "<strong>C. turkey</strong>.<br/>'turkey' là danh từ 2 âm tiết, nhấn âm 1. Còn 'enjoy', 'prepare' là động từ, nhấn âm 2." },
  { id: 4, question: "People often carve ______ at Halloween.<br/>A. eggs B. pumpkins C. cakes", answer: "<strong>B. pumpkins</strong>.<br/>carve pumpkins = khắc quả bí ngô (đặc trưng của Halloween)." },
];

const review3Exercises: ExerciseItem[] = [
  { id: 1, question: "The distance from my house to school is 2 km. (Viết lại câu bắt đầu bằng It)<br/>-> It is...", answer: "<strong>It is about 2 km from my house to school.</strong><br/>Mẹo: Cấu trúc <em>It is + (khoảng cách) + from (nơi A) to (nơi B).</em>" },
  { id: 2, question: "He was very tired. However, he finished his work. (Viết lại câu dùng Although)<br/>-> Although...", answer: "<strong>Although he was very tired, he finished his work.</strong><br/>Mẹo: Nhét Although thẳng vào đầu câu, bỏ chữ However đi, nối lại bằng dấu phẩy." },
  { id: 3, question: "Choose the word with different stress (Trọng âm khác):<br/>A. costume B. decide C. happy", answer: "<strong>B. decide</strong>.<br/>'decide' (quyết định) là động từ, nhấn âm 2 (de-CIDE). Còn 'costume', 'happy' là danh từ/tính từ nhấn âm 1." },
  { id: 4, question: "When you ride a motorbike, you ______ wear a helmet. (đưa lời khuyên)<br/>A. shouldn't B. should C. have", answer: "<strong>B. should</strong>.<br/>Bạn 'nên' (should) đội mũ bảo hiểm để đảm bảo an toàn." },
];

export const quizQuestions: QuizQuestion[] = [
  // Unit 7
  { id: 1, question: "What is the meaning of 'traffic jam'?", options: ["Kẹt xe", "Vạch qua đường", "Nhà ga", "An toàn"], correct: 0, explanation: "Traffic jam có nghĩa là tắc đường, kẹt xe.", unit: 7 },
  { id: 2, question: "______ about 300 metres from my house to the bus stop.", options: ["It is", "There is", "That is", "This is"], correct: 0, explanation: "Để nói khoảng cách, ta luôn luôn dùng 'It is' đứng đầu câu.", unit: 7 },
  { id: 3, question: "You ______ ride your bike on the pavement. It's for walking.", options: ["should", "shouldn't", "can", "do"], correct: 1, explanation: "Shouldn't = không nên. Chúng ta không nên đi xe đạp trên vỉa hè dành cho người đi bộ.", unit: 7 },
  { id: 4, question: "Which word has the /aɪ/ sound? (như chữ 'ai')", options: ["train", "sail", "sign", "wait"], correct: 2, explanation: "Sign (biển báo) đọc là /saɪn/ âm /aɪ/. Các chữ kia đều là âm /eɪ/.", unit: 7 },
  { id: 5, question: "A person who is walking in the street is a ______.", options: ["passenger", "driver", "vehicle", "pedestrian"], correct: 3, explanation: "Pedestrian = người đi bộ.", unit: 7 },
  { id: 6, question: "What does a 'cycle lane' sign mean?", options: ["Cấm xe đạp", "Làn đường cho xe đạp", "Đường cho ô tô", "Nơi đậu xe"], correct: 1, explanation: "Cycle = xe đạp, lane = làn đường. Đây là làn cho xe đạp.", unit: 7 },
  { id: 7, question: "Choose the word with different sound:", options: ["cycle", "fine", "fly", "plane"], correct: 3, explanation: "Plane đọc là âm eɪ (pla-in). Còn cycle, fine, fly đọc là aɪ (ai).", unit: 7 },
  { id: 8, question: "How ______ is it from here to the library? - It's 2 km.", options: ["long", "often", "far", "many"], correct: 2, explanation: "Hỏi về quãng đường (khoảng cách), ta dùng 'How far'.", unit: 7 },
  { id: 9, question: "A ______ crossing is where people can walk across the road safely.", options: ["tiger", "zebra", "lion", "animal"], correct: 1, explanation: "Zebra crossing là vạch kẻ đường cho người đi bộ (giống sọc ngựa vằn).", unit: 7 },
  { id: 10, question: "If you don't obey the rules, the police will ______ you.", options: ["fine", "find", "give", "take"], correct: 0, explanation: "Fine (v): Phạt tiền vì vi phạm.", unit: 7 },

  // Unit 8
  { id: 11, question: "A film that makes you laugh a lot is a ______.", options: ["horror film", "comedy", "documentary", "fantasy"], correct: 1, explanation: "Comedy = Phim hài (cười nhiều).", unit: 8 },
  { id: 12, question: "______ the film was long, they stayed to watch to the end.", options: ["Although", "However", "Because", "So"], correct: 0, explanation: "Although + Mệnh đề: Mặc dù phim dài, nhưng họ vẫn xem hết. Không dùng However vì chưa có dấu chấm hết câu.", unit: 8 },
  { id: 13, question: "The movie was so ______. I couldn't sleep all night.", options: ["frightening", "moving", "dull", "funny"], correct: 0, explanation: "Frightening = Đáng sợ. Sợ quá nên không ngủ được.", unit: 8 },
  { id: 14, question: "Which word has the /eə/ sound? (như chữ 'eo/e-ờ')", options: ["near", "really", "there", "clear"], correct: 2, explanation: "There đọc là /ðeə/. Các chữ kia đều là /ɪə/.", unit: 8 },
  { id: 15, question: "A film about life in the future, space, and robots is ______.", options: ["science fiction", "comedy", "romance", "documentary"], correct: 0, explanation: "Science fiction (khoa học viễn tưởng) nói về tương lai, vũ trụ.", unit: 8 },
  { id: 16, question: "Tom likes acting. He wants to be a film ______ in the future.", options: ["star", "reviewer", "poster", "comedy"], correct: 0, explanation: "Film star = ngôi sao điện ảnh. (Có nhắc đến từ 'acting' - diễn xuất).", unit: 8 },
  { id: 17, question: "The movie wasn't very good. ______, the music was fantastic.", options: ["Although", "Because", "However", "So"], correct: 2, explanation: "Câu trước phàn nàn, chấm một cái, dùng However (Tuy nhiên), theo sau là dấu phẩy để khen nhạc hay.", unit: 8 },
  { id: 18, question: "If a film is 'gripping', it means it is ______.", options: ["very boring", "very interesting", "very sad", "very short"], correct: 1, explanation: "Gripping = lôi cuốn, cực kỳ thú vị (very interesting).", unit: 8 },
  { id: 19, question: "She cried a lot because the film was very ______.", options: ["moving", "dull", "funny", "violent"], correct: 0, explanation: "Moving = cảm động. Phim cảm động khiến người ta khóc.", unit: 8 },
  { id: 20, question: "Find the word with different sound:", options: ["scary", "clear", "care", "bear"], correct: 1, explanation: "Clear là âm /ɪə/ (clia), 3 từ còn lại là /eə/.", unit: 8 },

  // Unit 9
  { id: 21, question: "People usually carve ______ at Halloween.", options: ["apples", "eggs", "pumpkins", "cakes"], correct: 2, explanation: "Khắc bí ngô (carve pumpkins) là truyền thống Halloween.", unit: 9 },
  { id: 22, question: "______ they go to the festival yesterday?", options: ["Do", "Are", "Did", "Will"], correct: 2, explanation: "Vì có chữ 'yesterday' (hôm qua) nên mượn trợ động từ quá khứ 'Did'.", unit: 9 },
  { id: 23, question: "Which word has stress on the FIRST syllable? (Nhấn âm 1)", options: ["decide", "prepare", "enjoy", "turkey"], correct: 3, explanation: "Danh từ 'turkey' (gà tây) nhấn âm 1. Các động từ kia nhấn âm 2.", unit: 9 },
  { id: 24, question: "During Easter, children like to paint chocolate ______.", options: ["eggs", "pumpkins", "trees", "flowers"], correct: 0, explanation: "Paint eggs: tô màu trứng (Lễ Phục sinh).", unit: 9 },
  { id: 25, question: "At Mid-Autumn Festival, children watch ______ dances in the street.", options: ["turkey", "lion", "pumpkin", "elephant"], correct: 1, explanation: "Lion dance = Múa lân (Tết trung thu).", unit: 9 },
  { id: 26, question: "We will cook a lot of food and have a big ______.", options: ["feast", "float", "costume", "candy"], correct: 0, explanation: "Feast = Bữa tiệc thịnh soạn rât nhiều đồ ăn.", unit: 9 },
  { id: 27, question: "______ you ready for the party tonight?", options: ["Do", "Are", "Did", "Does"], correct: 1, explanation: "'ready' là tính từ nên ta dùng to-be 'Are'. Không dùng mượn trợ động từ Do.", unit: 9 },
  { id: 28, question: "Which word has stress on the SECOND syllable? (Nhấn âm 2)", options: ["costume", "happy", "discuss", "clever"], correct: 2, explanation: "Động từ 'discuss' (thảo luận) nhấn âm 2. Các danh từ/tính từ kia nhấn âm 1.", unit: 9 },
  { id: 29, question: "People wear special ______ to trick-or-treat at Halloween.", options: ["costumes", "feasts", "displays", "activities"], correct: 0, explanation: "Costumes = Trang phục hóa trang.", unit: 9 },
  { id: 30, question: "At New Year, you can see beautiful fireworks ______ in the sky.", options: ["floats", "displays", "dances", "candy"], correct: 1, explanation: "Fireworks display = màn trình diễn pháo hoa.", unit: 9 },

  // Review 3
  { id: 31, question: "The distance between Ha Noi and Hai Phong is 100 km. -> ______ is 100 km from Ha Noi to Hai Phong.", options: ["This", "There", "It", "That"], correct: 2, explanation: "Chỉ khoảng cách luôn dùng cấu trúc 'It is...'.", unit: 0 },
  { id: 32, question: "______ it was raining heavily, we still played football.", options: ["However", "Because", "Although", "So"], correct: 2, explanation: "Although = Mặc dù (trời mưa to nhưng vẫn đá banh).", unit: 0 },
  { id: 33, question: "Choose the word with different stress (trọng âm):", options: ["helmet", "boring", "arrive"], correct: 2, explanation: "Động từ 'arrive' nhấn âm 2. Helmet, boring nhấn âm 1.", unit: 0 },
  { id: 34, question: "You ______ cross the road when the light is red.", options: ["should", "shouldn't", "can", "always"], correct: 1, explanation: "Không nên băng qua đường khi đèn đỏ (shouldn't).", unit: 0 },
  { id: 35, question: "______ they finish their homework last night?", options: ["Do", "Did", "Are", "Will"], correct: 1, explanation: "Có 'last night' -> dùng quá khứ đơn (Did).", unit: 0 },
  { id: 36, question: "Find different sound:", options: ["time", "tonight", "favourite", "fly"], correct: 2, explanation: "Chữ 'i' trong bài 'favourite' đọc là âm /ɪ/. Còn time, tonight, fly đọc là /aɪ/.", unit: 0 },
  { id: 37, question: "The film was very long. ______, it was very gripping.", options: ["Although", "Because", "However", "So"], correct: 2, explanation: "Phim dài chấm. Tuy nhiên (However) phẩy, nó rất lôi cuốn.", unit: 0 },
  { id: 38, question: "In Mid-Autumn Festival, children eat ______.", options: ["moon cakes", "turkeys", "candy apples", "pumpkins"], correct: 0, explanation: "Bánh trung thu = moon cakes.", unit: 0 },
  { id: 39, question: "Walking under the rain is not good. You ______ use an umbrella.", options: ["should", "shouldn't", "never", "can't"], correct: 0, explanation: "Đưa ra lời khuyên: 'Nên' sử dụng dù (should).", unit: 0 },
  { id: 40, question: "A ______ is a place where people can walk across safely.", options: ["traffic jam", "zebra crossing", "vehicle", "seatbelt"], correct: 1, explanation: "Zebra crossing là vạch kẻ đường cho bộ hành.", unit: 0 },
];

// --- LESSONS ---

export const lessons: Lesson[] = [
  // UNIT 7
  {
    id: 0, title: "Unit 7: Từ vựng Giao thông (Traffic)", unit: 7, icon: Car,
    color: "from-blue-600 to-cyan-500",
    content: (
      <div>
        <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Traffic (Giao thông)</h2>
          <p className="text-blue-700">Ghi nhớ từ vựng về các phương tiện, biển báo dễ hiểu nhất.</p>
        </div>
        <VocabTable items={unit7Vocab} colorTheme="bg-gradient-to-r from-blue-600 to-cyan-500" />
      </div>
    )
  },
  {
    id: 1, title: "Unit 7: Ngữ pháp It & Should", unit: 7, icon: Zap,
    color: "from-cyan-500 to-teal-400",
    content: (
      <div>
        <GrammarBox
          title="1. 'It' diễn tả khoảng cách"
          color="bg-cyan-600"
          rule={<p className="text-lg">Luôn dùng <strong>It is about + [Khoảng cách] + from... to...</strong> để hỏi khoảng cách bao xa.</p>}
          examples={[
            { correct: "It is about 2 km from my house to school.", explain: "Khoảng cách là 2 km." },
          ]}
        />
        <GrammarBox
          title="2. Should / Shouldn't (Nên / Không nên)"
          color="bg-teal-600"
          rule={<p className="text-lg">Đứng trước Động từ (nguyên mẫu) để đưa ra lời khuyên thiết thực.</p>}
          examples={[
            { correct: "You should wear a helmet.", explain: "Bạn nên đội nón bảo hiểm." },
            { correct: "You shouldn't drive too fast.", explain: "Bạn không nên lái xe quá nhanh." },
          ]}
        />
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-cyan-600" /> Bài tập áp dụng (Dễ hiểu)</h3>
          {unit7Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 2, title: "Unit 7: Ngữ âm /aɪ/ và /eɪ/", unit: 7, icon: Mic,
    color: "from-teal-400 to-emerald-400",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-teal-800 mb-6">Mẹo phân biệt cách phát âm siêu dễ</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="/aɪ/" words={["cycle", "fly", "fine", "sign", "bike"]} tip="Nghe giống vần 'ai' trong tiếng Việt. Ví dụ: F-ai-n (fine)." />
          <PhoneticCard pair="/eɪ/" words={["sail", "train", "plane", "wait", "pavement"]} tip="Nghe giống vần 'ây' nhưng hơi kéo dài chữ e. Ví dụ: Pl-ây-n (plane)." />
        </div>
      </div>
    )
  },

  // UNIT 8
  {
    id: 3, title: "Unit 8: Từ vựng Phim ảnh (Films)", unit: 8, icon: Film,
    color: "from-rose-500 to-pink-500",
    content: (
      <div>
        <div className="bg-rose-50 p-6 rounded-2xl mb-8 border border-rose-100">
          <h2 className="text-2xl font-bold text-rose-800 mb-2">Films (Phim ảnh)</h2>
          <p className="text-rose-700">Các loại phim và tính từ diễn tả cảm xúc rất quen thuộc.</p>
        </div>
        <VocabTable items={unit8Vocab} colorTheme="bg-gradient-to-r from-rose-500 to-pink-500" />
      </div>
    )
  },
  {
    id: 4, title: "Unit 8: Ngữ pháp Although & However", unit: 8, icon: Star,
    color: "from-pink-500 to-fuchsia-500",
    content: (
      <div>
        <GrammarBox
          title="Mẹo phân biệt Although vs However (Rất quan trọng)"
          color="bg-rose-600"
          rule={<p className="text-lg">Hai từ này đều mang nghĩa trái ngược, nhưng cách dùng dấu câu khác hẳn nhau.</p>}
          examples={[
            { correct: "Although he is young, he plays well.", explain: "Although đứng đầu câu, kết nối 2 vế bằng dấu phẩy." },
            { correct: "He is young. However, he plays well.", explain: "However nằm sau dấu chấm (.) và trước nó có dấu phẩy (,). Hoặc sau dấu chấm phẩy (;However,)" },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-pink-600" /> Vận dụng nhanh</h3>
          {unit8Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 5, title: "Unit 8: Ngữ âm /ɪə/ và /eə/", unit: 8, icon: Mic,
    color: "from-fuchsia-500 to-purple-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-fuchsia-800 mb-6">Mẹo phân biệt âm /ɪə/ và /eə/</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="/ɪə/" words={["clear", "near", "idea", "really", "appear"]} tip="Nghe giống chữ 'ia' trong tiếng Việt. Ví dụ: cl-ia (clear)." />
          <PhoneticCard pair="/eə/" words={["scary", "careful", "there", "bear", "share"]} tip="Nghe giống chữ 'e-ờ' trong tiếng Việt. Đoạn cuối hơi ồ lên 1 xíu." />
        </div>
      </div>
    )
  },

  // UNIT 9
  {
    id: 6, title: "Unit 9: Từ vựng Lễ hội (Festivals)", unit: 9, icon: Gift,
    color: "from-amber-500 to-orange-500",
    content: (
      <div>
        <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Festivals (Lễ hội quanh thế giới)</h2>
          <p className="text-amber-700">Các hoạt động và đồ ăn đặc trưng ngày lễ.</p>
        </div>
        <VocabTable items={unit9Vocab} colorTheme="bg-gradient-to-r from-amber-500 to-orange-500" />
      </div>
    )
  },
  {
    id: 7, title: "Unit 9: Câu hỏi Yes/No", unit: 9, icon: Zap,
    color: "from-orange-500 to-red-500",
    content: (
      <div>
        <GrammarBox
          title="Yes/No Questions"
          color="bg-orange-600"
          rule={<p className="text-lg">Muốn đặt câu hỏi Yes/No, bạn chỉ việc đưa Trợ động từ (Do/Does/Did) hoặc Tobe (Am/Is/Are) lên CÙNG ĐẦU CÂU.</p>}
          examples={[
            { correct: "Did they eat moon cakes yesterday?", explain: "Có yesterday -> dùng trợ động từ quá khứ Did." },
            { correct: "Are you watching the parade now?", explain: "Có chữ now -> dùng to-be Are." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-orange-600" /> Luyện tập điền từ</h3>
          {unit9Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 8, title: "Unit 9: Trọng âm từ 2 âm tiết", unit: 9, icon: Mic,
    color: "from-red-500 to-rose-600",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-red-800 mb-6">Mẹo nhớ Dễ Ẹc về Trọng âm</h2>
        <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-6">
          <ul className="space-y-3 text-lg text-red-900">
            <li>✅ <strong>Danh từ & Tính từ:</strong> Thường nhấn vào âm số <strong>1</strong>. (Ví dụ: 'turkey, 'happy, 'costume).</li>
            <li>✅ <strong>Động từ:</strong> Thường nhấn vào âm số <strong>2</strong>. (Ví dụ: en'joy, de'cide, dis'cuss).</li>
          </ul>
        </div>
      </div>
    )
  },

  // REVIEW 3
  {
    id: 9, title: "Review 3: Ôn tập tổng hợp", unit: 0, icon: RotateCcw,
    color: "from-violet-500 to-purple-600",
    content: (
      <div>
        <div className="bg-violet-50 p-6 rounded-2xl mb-8 border border-violet-100">
          <h2 className="text-2xl font-bold text-violet-800 mb-2">🔄 Review 3 (Lấy trọn điểm thi)</h2>
          <p className="text-violet-700">Các dạng bài tập thực tế thường xuất hiện trong đề thi 45 phút.</p>
        </div>
        <div className="space-y-4">
          {review3Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  }
];
