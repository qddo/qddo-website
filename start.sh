#!/usr/bin/env bash
# Inicia um servidor local na porta 8080 para visualizar o site.
# Uso: ./start.sh

set -e
PORT=8080

cd "$(dirname "$0")"

echo ""
echo "🚀 QDDO Central Hub — servidor local"
echo ""
echo "   Abra no navegador: http://localhost:$PORT"
echo "   Para parar: Ctrl + C"
echo ""

if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server $PORT
elif command -v python >/dev/null 2>&1; then
  python -m http.server $PORT
elif command -v npx >/dev/null 2>&1; then
  npx serve -l $PORT .
else
  echo "❌ Nenhum servidor encontrado. Instale Python 3 ou Node.js."
  exit 1
fi
