#!/usr/bin/env bash
# Instala as fotos nos slots do site.
#
# Uso:
#   1. salve as 20 fotos numa pasta, na MESMA ORDEM em que foram enviadas
#      no chat, com os nomes foto-01.jpg … foto-20.jpg
#   2. bash instalar-fotos.sh [pasta]     (padrão: ./fotos-brutas)
#
# O mapeamento abaixo alterna, de seção em seção, a quantidade de pessoas
# (uma → grupo → dupla) e a temperatura de cor (quente → fria → neutra).
set -u
ORIGEM="${1:-fotos-brutas}"
DESTINO="assets/media"

MAPA="
01:case-02
02:hero-03
03:footer-word-06
04:footer-word-07
05:vida-03
06:case-01
07:footer-word-08
08:hero-01
09:vida-04
10:footer-word-05
11:footer-word-03
12:vida-02
13:vida-01
14:footer-word-01
15:footer-word-02
16:case-05
17:case-04
18:hero-02
19:footer-word-04
20:case-03
"

if [ ! -d "$ORIGEM" ]; then
  echo "Pasta '$ORIGEM' não existe. Crie e coloque foto-01.jpg … foto-20.jpg dentro."
  exit 1
fi
mkdir -p "$DESTINO"

ok=0; falta=0
for par in $MAPA; do
  n="${par%%:*}"; slot="${par##*:}"
  src="$ORIGEM/foto-$n.jpg"
  if [ -f "$src" ]; then
    cp "$src" "$DESTINO/$slot.jpg"
    echo "  foto-$n.jpg  ->  $slot.jpg"
    ok=$((ok+1))
  else
    echo "  (falta)      ->  $slot.jpg   [esperava $src]"
    falta=$((falta+1))
  fi
done

# a capa de compartilhamento repete a foto do auditório (foto-15)
if [ -f "$ORIGEM/foto-15.jpg" ]; then
  cp "$ORIGEM/foto-15.jpg" "$DESTINO/og-cover.jpg"
  echo "  foto-15.jpg  ->  og-cover.jpg (capa de compartilhamento)"
fi

echo
echo "instalados: $ok   faltando: $falta"
echo "Recarregue o site: os slots preenchidos trocam o placeholder pela foto sozinhos."
