using MonApi.Shared.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using API_annuaire.Shared.Data;

namespace MonApi.Shared.Repositories;

public class BaseRepository<TModel> : IBaseRepository<TModel> where TModel : class
{
    protected readonly AnnuaireEntrepriseContext _context;

    public BaseRepository(AnnuaireEntrepriseContext context)
    {
        _context = context;
    }

    public virtual async Task<TModel> AddAsync(TModel model, CancellationToken cancellationToken = default)
    {
        _context.Set<TModel>().Add(model);

        await SaveChangesAsync(cancellationToken);

        return model;
    }

    public virtual async Task UpdateAsync(TModel model, CancellationToken cancellationToken = default)
    {
        _context?.Set<TModel>().Update(model);
        await SaveChangesAsync(cancellationToken);
    }

    public virtual async Task DeleteAsync(TModel model, CancellationToken cancellationToken = default)
    {
        _context.Set<TModel>().Remove(model);
        await SaveChangesAsync(cancellationToken);
    }

    public virtual async Task SoftDeleteAsync(TModel model, CancellationToken cancellationToken = default)
    {
        _context.Set<TModel>().Update(model);
        await SaveChangesAsync(cancellationToken);
    }

    protected async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task<TModel?> FindAsync<TId>(TId id, CancellationToken cancellationToken = default) where TId : notnull
    {
        return await _context.FindAsync<TModel>([id], cancellationToken);
    }

    public virtual async Task<List<TModel>> ListAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Set<TModel>().ToListAsync(cancellationToken);
    }

    public virtual async Task<List<TModel>> ListAsync(Expression<Func<TModel, bool>> predicate, CancellationToken cancellationToken = default)
    {
        return await _context.Set<TModel>().Where(predicate).ToListAsync(cancellationToken);
    }

    public virtual async Task<bool> AnyAsync(Expression<Func<TModel, bool>> predicate, CancellationToken cancellationToken = default)
    {
        return await _context.Set<TModel>().AnyAsync(predicate, cancellationToken);
    }

    public virtual async Task<int> CountAsync(Expression<Func<TModel, bool>> predicate, CancellationToken cancellationToken = default)
    {
        return await _context.Set<TModel>().Where(predicate).CountAsync(cancellationToken);
    }

    public virtual async Task<int> CountAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Set<TModel>().CountAsync(cancellationToken);
    }

    public virtual async Task<TModel?> FirstOrDefaultAsync(Expression<Func<TModel, bool>> predicate, CancellationToken cancellationToken = default)
    {
        return await _context.Set<TModel>().FirstOrDefaultAsync(predicate, cancellationToken);
    }
}
