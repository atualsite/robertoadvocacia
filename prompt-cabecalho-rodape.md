# Prompt — Cabeçalho e Rodapé (Roberto Advocacia)

## Cabeçalho (Header) — Glass Morphism Flutuante

### Estrutura HTML
```
<header class="header glass-nav" id="header">
    <div class="glass-filter"></div>
    <div class="glass-overlay"></div>
    <div class="glass-specular"></div>
    <div class="container header-inner glass-content">
        <a href="#inicio" class="logo">...</a>
        <nav class="nav">...</nav>
        <div class="header-actions">
            <button class="lg-switcher" id="themeSwitcher">...</button>
        </div>
        <div class="mobile-header-actions">
            <button class="lg-switcher mobile-theme-switcher" id="mobileThemeSwitcher">...</button>
            <button class="menu-toggle" id="menuToggle">...</button>
        </div>
    </div>
</header>
```

### Funcionalidades
- **Posicionamento**: Fixo no topo, centralizado, `top: 16px`
- **Largura**: `calc(100% - 48px)`, max-width `1100px`
- **Border-radius**: `50px` (pill)
- **Padding interno**: `17px 28px`
- **Glass morphism**: 3 camadas (filter, overlay, specular) + SVG filter de distorção
- **Contorno gradiente**: Radial dourado sutil via `::before` com mask-composite
  - Centro: `rgba(198, 161, 91, 0.7)` → bordas: `rgba(198, 161, 91, 0.02)`
- **Dark mode**: `rgba(0, 0, 0, 0.43)` | **Light mode**: `rgba(255, 255, 255, 0.92)`
- **Logo**: Fonte Merriweather, 1.2rem, ícone dourado
- **Nav links**: Fonte Inter, 0.85rem, uppercase quando active
- **Theme switcher**: Botão circular Liquid Glass 40x40px (desktop), 36x36px (mobile)
- **Responsivo**: Mobile esconde nav e header-actions, mostra hamburger menu

### CSS Essencial
```css
.glass-nav {
    --bg-color: rgba(0, 0, 0, 0.43);
    --highlight: rgba(255, 255, 255, 0.15);
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 48px);
    max-width: 1100px;
    border-radius: 50px;
    overflow: hidden;
}

.header-inner {
    padding: 17px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-inner::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50px;
    padding: 1px;
    background: radial-gradient(circle at 50% 50%,
        rgba(198, 161, 91, 0.7) 0%,
        rgba(198, 161, 91, 0.3) 35%,
        rgba(198, 161, 91, 0.08) 70%,
        rgba(198, 161, 91, 0.02) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
```

### Theme Switcher — Liquid Glass Circle
```css
.lg-switcher {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12),
                inset 1.5px 2px 0 -1.5px rgba(255,255,255,0.6),
                inset -1.5px -1.5px 0 -1.5px rgba(255,255,255,0.5),
                inset -2px -6px 1px -5px rgba(255,255,255,0.3),
                inset -0.3px -1px 4px 0 rgba(0,0,0,0.08),
                0 2px 8px rgba(0,0,0,0.1);
}

.lg-switcher .lg-switcher__icon--light { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.lg-switcher .lg-switcher__icon--dark { opacity: 1; transform: rotate(0) scale(1); }
.lg-switcher[data-theme="light"] .lg-switcher__icon--light { opacity: 1; transform: rotate(0) scale(1); }
.lg-switcher[data-theme="light"] .lg-switcher__icon--dark { opacity: 0; transform: rotate(90deg) scale(0.5); }
```

---

## Rodapé (Footer)

### Estrutura HTML
```
<footer class="footer">
    <div class="container">
        <div class="footer-top">
            <div class="footer-brand">
                <a class="footer-logo">...</a>
                <p>...</p>
                <div class="footer-social">...</div>
            </div>
            <div class="footer-links-group">
                <div class="footer-col">Links Rápidos</div>
                <div class="footer-col">Horários</div>
                <div class="footer-col">Contato</div>
            </div>
        </div>
        <div class="footer-bottom">
            <span>Copyright</span>
            <span>|</span>
            <a>Política</a>
            <span>|</span>
            <a>Lei OAB</a>
            <span>|</span>
            <span>Site criado por AtualizaPRO</span>
        </div>
    </div>
</footer>
```

### Layout
- **Desktop**: Grid 2 colunas (brand 1.2fr + links 2fr)
- **Links group**: Grid 3 colunas (`repeat(3, 1fr)`)
- **Tablet**: Brand centralizado, links 2 colunas
- **Mobile**: Tudo 1 coluna, centralizado

### Fontes (padrão site referência)
| Elemento | Tamanho |
|---|---|
| Títulos colunas | 0.85rem, uppercase, bold 700 |
| Conteúdo links | 0.8rem |
| Contato | 0.8rem |
| Horários | 0.8rem |
| Footer-bottom | 0.78rem |
| Separadores | 0.6rem |

### Espaçamentos
| Elemento | Valor |
|---|---|
| Padding geral | 50px 40px |
| Gap colunas | 30px |
| Gap links group | 30px |
| Margem título | 5px |
| Margem itens | 3px (horários), 8px (contato) |
| Padding footer-bottom | 15px |

### Horários — Estilo
- Dia à esquerda: `rgba(255, 255, 255, 0.5)`
- Horário à direita: `var(--accent)` dourado, `font-weight: 500`
- Display flex com `justify-content: space-between`

### Footer-bottom
- Layout: flex wrap, centralizado, gap `4px 10px`
- Separadores: pipe `|`, cor `rgba(255,255,255,0.3)`, tamanho 0.6rem
- Links: underline, cor `rgba(255,255,255,0.4)`
- Powered by: `rgba(255,255,255,0.4)`, strong `rgba(255,255,255,0.55)`

### CSS Essencial
```css
.footer {
    background: #060E18;
    padding: 50px 40px 0;
}

.footer-top {
    display: grid;
    grid-template-columns: 1.2fr 2fr;
    gap: 30px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-links-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.footer-col h4 {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 5px;
}

.footer-col ul a,
.contact-list li,
.schedule-list li span:first-child {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
}

.schedule-list li span:last-child {
    color: var(--accent);
    font-weight: 500;
}

.footer-bottom {
    padding: 15px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 4px 10px;
    font-size: 0.78rem;
}
```

---

## Notas Técnicas
- **SVG Filter**: Usado para distorção glass (feTurbulence + feDisplacementMap)
- **Backdrop-filter**: `blur(4px)` no glass nav, `blur(8px)` no theme switcher
- **Mask-composite**: Técnica para borda gradiente sem影响o no layout
- **Transições**: 400ms cubic-bezier(1, 0, 0.4, 1) para efeitos suaves
- **LocalStorage**: Salva tema preferido (dark/light)
- **Ícones**: Font Awesome 6 para redes sociais e contato
