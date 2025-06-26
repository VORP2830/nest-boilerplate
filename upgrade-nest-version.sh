echo "🚀 Iniciando atualização NestJS para a versão mais recente disponível..."

echo "🔧 Atualizando NestJS CLI global..."
npm install -g @nestjs/cli@latest

if ! command -v ncu &> /dev/null; then
  echo "🔧 Instalando npm-check-updates..."
  npm install -g npm-check-updates
fi

echo "📦 Atualizando @nestjs/* e libs relacionadas..."
ncu '/@nestjs.*/' -u
ncu '/(rxjs|reflect-metadata|typescript|typeorm|class-validator|class-transformer)/' -u

echo "📥 Instalando dependências..."
npm install

echo "📌 Nest CLI versão instalada: $(nest --version)"
echo "📦 Pacotes Nest no projeto:"
npm list --depth=0 | grep @nestjs

echo "✅ Atualização concluída!"
