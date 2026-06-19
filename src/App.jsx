import { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import './App.css'

const PRESETS = [
  { name: 'Padrão',   fg: '#0B0B0F', bg: '#FFFFFF' },
  { name: 'Lima',     fg: '#0B0B0F', bg: '#D4FF3F' },
  { name: 'Coral',    fg: '#FFFFFF', bg: '#FF6B5C' },
  { name: 'Oceano',   fg: '#FFFFFF', bg: '#1E40AF' },
  { name: 'Floresta', fg: '#FFFFFF', bg: '#065F46' },
  { name: 'Inverso',  fg: '#FFFFFF', bg: '#0B0B0F' },
]

export default function App() {
  const [text, setText] = useState('https://qr.studio')
  const [fgColor, setFgColor] = useState('#0B0B0F')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [logo, setLogo] = useState(null)
  const [filename, setFilename] = useState('qrcode')

  const qrRef = useRef(null)
  const qrInstance = useRef(null)
  const fileInputRef = useRef(null)

  // Cria a instância do QR Code uma única vez quando o componente monta
  useEffect(() => {
    qrInstance.current = new QRCodeStyling({
      width: 320,
      height: 320,
      type: 'canvas',
      data: text || ' ',
      dotsOptions: { color: fgColor, type: 'rounded' },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { type: 'extra-rounded' },
      cornersDotOptions: { type: 'dot' },
      imageOptions: { crossOrigin: 'anonymous', margin: 6, imageSize: 0.3 },
    })
    qrInstance.current.append(qrRef.current)

    return () => {
      if (qrRef.current) qrRef.current.innerHTML = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Atualiza o QR sempre que algum parâmetro muda
  useEffect(() => {
    if (!qrInstance.current) return
    qrInstance.current.update({
      data: text || ' ',
      dotsOptions: { color: fgColor, type: 'rounded' },
      backgroundOptions: { color: bgColor },
      image: logo || undefined,
    })
  }, [text, fgColor, bgColor, logo])

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setLogo(ev.target.result)
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogo(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const download = () => {
    qrInstance.current.download({
      name: filename || 'qrcode',
      extension: 'png',
    })
  }

  const applyPreset = (preset) => {
    setFgColor(preset.fg)
    setBgColor(preset.bg)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-mark" aria-hidden>▢</span>
          <span className="brand-name">QR Studio</span>
        </div>
        <span className="brand-meta">gerador · 2026</span>
      </header>

      <main className="main">
        <section className="controls">
          <div className="field">
            <label className="label" htmlFor="content">Conteúdo</label>
            <textarea
              id="content"
              className="textarea"
              placeholder="Cole aqui um link, texto, vCard ou qualquer coisa..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
            />
            <span className="hint">URL, texto, e-mail, telefone, vCard</span>
          </div>

          <div className="field">
            <span className="label">Paletas</span>
            <div className="presets">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  className="preset"
                  onClick={() => applyPreset(p)}
                  style={{ background: p.bg, color: p.fg, borderColor: p.fg === '#FFFFFF' ? p.bg : 'var(--border)' }}
                  aria-label={`Aplicar paleta ${p.name}`}
                >
                  <span className="preset-name">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="color-row">
              <ColorInput label="Frente" value={fgColor} onChange={setFgColor} />
              <ColorInput label="Fundo" value={bgColor} onChange={setBgColor} />
            </div>
          </div>

          <div className="field">
            <span className="label">Logo no centro</span>
            {!logo ? (
              <label className="upload">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  hidden
                />
                <span className="upload-icon" aria-hidden>+</span>
                <span className="upload-text">Adicionar imagem</span>
                <span className="hint">PNG, JPG, SVG · fundo transparente recomendado</span>
              </label>
            ) : (
              <div className="logo-preview">
                <img src={logo} alt="Logo enviado" />
                <div className="logo-info">
                  <span className="logo-status">Logo carregado</span>
                  <span className="hint">Aparece no centro do QR Code</span>
                </div>
                <button type="button" onClick={removeLogo} className="logo-remove">
                  Remover
                </button>
              </div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="filename">Nome do arquivo</label>
            <input
              id="filename"
              type="text"
              className="input"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="qrcode"
            />
          </div>
        </section>

        <aside className="preview">
          <div className="preview-stage">
            <div className="qr-container" ref={qrRef} />
          </div>
          <button type="button" className="download" onClick={download}>
            Baixar PNG
          </button>
          <p className="preview-note">Atualiza em tempo real</p>
        </aside>
      </main>

      <footer className="footer">
        <span>Tudo acontece no seu navegador · nada é enviado pra servidor</span>
      </footer>
    </div>
  )
}

function ColorInput({ label, value, onChange }) {
  return (
    <div className="color-input">
      <span className="color-label">{label}</span>
      <label className="color-swatch" style={{ background: value }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Selecionar cor de ${label.toLowerCase()}`}
        />
      </label>
      <input
        type="text"
        className="color-hex"
        value={value.toUpperCase()}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  )
}
