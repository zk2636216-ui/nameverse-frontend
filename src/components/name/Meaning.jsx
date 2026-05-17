import { Globe, Languages, Volume2, Zap, Target, Sparkles, Shield, Clock, Award } from 'lucide-react';

const getLanguageFlag = (langKey) => {
  const flags = {
    sanskrit: '🕉️', english: '🇺🇸', urdu: '🇵🇰', arabic: '🇸🇦', hindi: '🇮🇳', pashto: '🇦🇫', tamil: '🇮🇳', telugu: '🇮🇳', marathi: '🇮🇳', bengali: '🇧🇩', punjabi: '🇮🇳', turkish: '🇹🇷', persian: '🇮🇷', malay: '🇲🇾', indonesian: '🇮🇩', french: '🇫🇷', spanish: '🇪🇸', german: '🇩🇪', italian: '🇮🇹', chinese: '🇨🇳', japanese: '🇯🇵', korean: '🇰🇷', russian: '🇷🇺'
  };
  return flags[langKey?.toLowerCase()] || '🌐';
};

const getLanguageName = (key) => {
  const names = {
    sanskrit: 'Sanskrit', english: 'English', urdu: 'Urdu', arabic: 'Arabic', hindi: 'Hindi', pashto: 'Pashto', tamil: 'Tamil', telugu: 'Telugu', marathi: 'Marathi', bengali: 'Bengali', punjabi: 'Punjabi', turkish: 'Turkish', persian: 'Persian', malay: 'Malay', indonesian: 'Indonesian', french: 'French', spanish: 'Spanish', german: 'German', italian: 'Italian', chinese: 'Chinese', japanese: 'Japanese', korean: 'Korean', russian: 'Russian'
  };
  return names[key?.toLowerCase()] || key;
};

const collectLanguages = (data) => {
  const keys = ['in_sanskrit', 'in_english', 'in_urdu', 'in_arabic', 'in_hindi', 'in_pashto', 'in_tamil', 'in_telugu', 'in_marathi', 'in_bengali', 'in_punjabi', 'in_turkish', 'in_persian', 'in_malay', 'in_indonesian', 'in_french', 'in_spanish', 'in_german', 'in_italian', 'in_chinese', 'in_japanese', 'in_korean', 'in_russian'];
  return keys
    .map((key) => ({ key, value: data[key] }))
    .filter(({ value }) => value && Object.keys(value).length > 0)
    .map(({ key, value }) => ({
      code: key.replace('in_', ''),
      flag: getLanguageFlag(key.replace('in_', '')),
      name: getLanguageName(key.replace('in_', '')),
      value,
    }));
};

export default function Meaning({ data }) {
  const languages = collectLanguages(data);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-sm">
            <Globe className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-semibold">Meaning & Origin</h2>
        </div>

        <p className="leading-7 text-slate-700">
          {data.long_meaning || data.overview || `${data.name} is a ${data.gender ? data.gender.toLowerCase() : 'beautiful'} name of ${data.origin || 'significant'} origin that means "${data.short_meaning || data.meaning || 'a meaningful concept'}".`}
        </p>

        {data.spiritual_meaning && (
          <div className="mt-5 rounded-3xl bg-amber-50 p-4 text-slate-800 shadow-sm">
            <h3 className="font-semibold">Spiritual meaning</h3>
            <p className="mt-2 text-sm leading-6">{data.spiritual_meaning}</p>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
            <Languages className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-semibold">Language details</h2>
        </div>

        {languages.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {languages.map((language) => (
              <div key={language.code} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </div>
                <div className="text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{language.value.name || data.name}</p>
                  {language.value.meaning ? <p>{language.value.meaning}</p> : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">Translations are not available for this name yet.</p>
        )}
      </section>

      {(data.pronunciation || data.lucky_number || data.lucky_day || data.lucky_colors?.length || data.lucky_stone || data.life_path_number) && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Volume2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Pronunciation & Numerology</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {data.pronunciation?.english && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Pronunciation</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{data.pronunciation.english}</p>
                {data.pronunciation?.ipa ? <p className="mt-1 text-sm text-slate-600">{data.pronunciation.ipa}</p> : null}
              </div>
            )}
            {data.lucky_number && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Lucky number</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{data.lucky_number}</p>
              </div>
            )}
            {data.lucky_day && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Lucky day</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{data.lucky_day}</p>
              </div>
            )}
            {data.lucky_colors?.length > 0 && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Lucky colors</p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {data.lucky_colors.map((color) => (
                    <span key={color} className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{color}</span>
                  ))}
                </div>
              </div>
            )}
            {data.life_path_number && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Life path</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{data.life_path_number}</p>
              </div>
            )}
            {data.lucky_stone && (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Lucky stone</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{data.lucky_stone}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {(data.cultural_impact || data.islamic_reference || data.vedic_reference || data.organic_story) && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Cultural & Spiritual notes</h2>
          </div>

          <div className="space-y-4 text-slate-700">
            {data.cultural_impact && <p>{data.cultural_impact}</p>}
            {data.spiritual_significance && <p>{data.spiritual_significance}</p>}
            {data.islamic_reference && (
              <p className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-800">
                {data.islamic_reference.is_quranic ? 'Quranic name' : 'Traditional Islamic name'}{data.islamic_reference.note ? ` - ${data.islamic_reference.note}` : ''}
              </p>
            )}
            {data.vedic_reference && (
              <p className="rounded-3xl bg-amber-50 p-4 text-sm text-amber-800">
                {data.vedic_reference.is_vedic ? 'Vedic name' : 'Cultural name'}{data.vedic_reference.root_origin ? ` • Root: ${data.vedic_reference.root_origin}` : ''}{data.vedic_reference.note ? ` • ${data.vedic_reference.note}` : ''}
              </p>
            )}
          </div>
        </section>
      )}

      {data.historical_references?.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Historical references</h2>
          </div>

          <div className="space-y-4">
            {data.historical_references.map((item, idx) => {
              // Handle different API shapes: {reference, time_period} or {name, profession, country, notes} or plain strings
              const refText = item.reference || item.notes || (typeof item === 'string' ? item : '');
              const refPeriod = item.time_period || '';
              return (
                <div key={idx} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm leading-6 text-slate-700">{refText}</p>
                  {refPeriod && <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{refPeriod}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {data.celebrity_usage?.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <Award className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Notable people with this name</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.celebrity_usage.map((person, idx) => (
              <span key={idx} className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">{person}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
